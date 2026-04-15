import { redirect } from "next/navigation";

export default function PaymentCancel() {
  const frontendUrl =
    process.env.NEXT_PUBLIC_FRONTEND_URL || "https://wellnesseastern.com";
  redirect(`${frontendUrl}?payment=cancelled`);
}
