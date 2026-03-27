import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (_stripe) return _stripe;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("Missing STRIPE_SECRET_KEY environment variable");
  _stripe = new Stripe(key, { apiVersion: "2026-03-25.dahlia" });
  return _stripe;
}

// Lazy proxy - safe to import at module level without env vars
export const stripe: Stripe = new Proxy({} as Stripe, {
  get(_target, prop: string | symbol) {
    const client = getStripe();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const val = (client as unknown as Record<string | symbol, unknown>)[prop];
    if (typeof val === "function") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (val as (...args: unknown[]) => unknown).bind(client);
    }
    return val;
  },
});
