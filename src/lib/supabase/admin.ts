import "server-only";
import { createClient } from "@supabase/supabase-js";

// Usa a service role, que ignora RLS: só pode ser importado em código de servidor.
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false, autoRefreshToken: false } },
);
