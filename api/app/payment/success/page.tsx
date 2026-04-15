import { redirect } from "next/navigation";

export default function PaymentSuccess({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const frontendUrl =
    process.env.NEXT_PUBLIC_FRONTEND_URL || "https://wellnesseastern.com";
  redirect(
    `${frontendUrl}?payment=success&session_id=${searchParams.session_id ?? ""}`
  );
}
