import { NextRequest, NextResponse } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getUserFromRequest, userHasVideoAccess } from "@/lib/auth";

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// Map S3 key prefix to courseId
function getCourseIdFromKey(key: string): string {
  if (key.startsWith("face-yoga/")) return "faceyoga";
  if (key.startsWith("taichi/")) return "taichi";
  if (key.startsWith("acupressure/")) return "qigong";
  return key.split("/")[0];
}

// Lesson numbers that are always free to preview
const FREE_PREVIEW_KEYS = new Set([
  "face-yoga/lesson-01-introduction-guide.mp4",
  "face-yoga/lesson-02-forehead-wrinkle-relief.mp4",
  "taichi/lesson-01-five-element-wellness-qigong.mp4",
  "taichi/lesson-02-six-healing-sounds-breathing.mp4",
  "acupressure/lesson-01-head-acupressure.mp4",
  "acupressure/lesson-02-face-acupressure.mp4",
]);

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get("key");

    if (!key) {
      return NextResponse.json({ error: "Video key required" }, { status: 400 });
    }

    // Free preview lessons - no auth needed
    if (FREE_PREVIEW_KEYS.has(key)) {
      const command = new GetObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME!,
        Key: key,
      });
      const signedUrl = await getSignedUrl(s3, command, { expiresIn: 600 });
      return NextResponse.json({ url: signedUrl });
    }

    // All other videos require authentication + purchase
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json(
        { error: "Login required to access this video" },
        { status: 401 }
      );
    }

    const courseId = getCourseIdFromKey(key);
    const hasAccess = await userHasVideoAccess(user.id, courseId, key);

    if (!hasAccess) {
      return NextResponse.json(
        { error: "Purchase required to access this video" },
        { status: 403 }
      );
    }

    const command = new GetObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: key,
    });

    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 600 });
    return NextResponse.json({ url: signedUrl });
  } catch (err) {
    console.error("Video URL error:", err);
    return NextResponse.json(
      { error: "Failed to generate video URL" },
      { status: 500 }
    );
  }
}
