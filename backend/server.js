const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const app = express();

/* ===============================
   CORS 配置（本地 + Vercel）
   ⚠️ 这是你现在视频播不了的关键
================================ */
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "http://127.0.0.1:5173",
            "https://eastculture.vercel.app", // ✅ old domain (keep for backward compat)
            "https://wellnesseastern.com", // ✅ new domain
        ],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json());

const PORT = process.env.PORT || 3001;

/* ===============================
   启动前检查 .env（防止低级错误）
================================ */
const requiredEnv = [
    "AWS_REGION",
    "S3_BUCKET_NAME",
    "AWS_ACCESS_KEY_ID",
    "AWS_SECRET_ACCESS_KEY",
];

const missing = requiredEnv.filter((k) => !process.env[k]);
if (missing.length > 0) {
    console.log("❌ backend/.env 缺少以下字段：", missing.join(", "));
    console.log(`
你需要在 backend/.env 中补上，例如：

AWS_REGION=ap-southeast-2
S3_BUCKET_NAME=eastculture-video-nz
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx
`);
}

/* ===============================
   MongoDB（可选，不影响视频）
================================ */
const MONGODB_URI =
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/eastculture";

mongoose
    .connect(MONGODB_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.log("⚠️ MongoDB not connected:", err.message));

/* ===============================
   AWS S3 Client
================================ */
const s3 = new S3Client({
    region: process.env.AWS_REGION, // 必须和 bucket 区域一致
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

/* ===============================
   基础健康检查接口
================================ */
app.get("/", (req, res) => {
    res.send("✅ EastCulture backend is running.");
});

/* ===============================
   获取 S3 视频 Signed URL（核心接口）
   GET /api/video-url?key=face-yoga/lesson-01-introduction-guide.mp4
================================ */
app.get("/api/video-url", async (req, res) => {
    try {
        const { key } = req.query;

        if (!key) {
            return res.status(400).json({ error: "Video key is required" });
        }

        // 🚧 以后你在这里加「是否已购买」判断
        // if (!userHasPurchased) {
        //   return res.status(403).json({ error: "Not authorized" });
        // }

        const command = new GetObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key,
        });

        // ⏱️ 10 分钟有效（推荐）
        const signedUrl = await getSignedUrl(s3, command, {
            expiresIn: 60 * 10,
        });

        return res.json({
            url: signedUrl,
        });
    } catch (error) {
        console.error("❌ Signed URL error:", error);
        return res.status(500).json({
            error: "Failed to generate video URL",
            detail: error.message,
        });
    }
});

/* ===============================
   启动服务
================================ */
app.listen(PORT, () => {
    console.log(`🚀 Backend running at http://localhost:${PORT}`);
});