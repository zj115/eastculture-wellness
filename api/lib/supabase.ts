import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

export type SupabaseAdminClient = SupabaseClient<Database>;

let _client: SupabaseAdminClient | null = null;

function getClient(): SupabaseAdminClient {
  if (_client) return _client;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error(
      "Missing Supabase env vars: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY"
    );
  }

  _client = createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false },
  });

  return _client;
}

// Export as a getter property so callers can use `supabaseAdmin.from(...)` syntax
// but the client is not created until first use
export const supabaseAdmin: SupabaseAdminClient = new Proxy(
  {} as SupabaseAdminClient,
  {
    get(_target, prop: string | symbol) {
      const client = getClient();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const val = (client as unknown as Record<string | symbol, unknown>)[prop];
      if (typeof val === "function") {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (val as (...args: unknown[]) => unknown).bind(client);
      }
      return val;
    },
  }
);
