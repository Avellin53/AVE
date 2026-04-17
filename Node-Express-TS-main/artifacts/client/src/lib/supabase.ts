import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;
let configPromise: Promise<{ supabaseUrl: string; supabaseAnonKey: string }> | null = null;

async function fetchConfig(): Promise<{ supabaseUrl: string; supabaseAnonKey: string }> {
  const res = await fetch("/api/config");
  if (!res.ok) throw new Error("Failed to load app configuration.");
  return res.json();
}

export async function getSupabaseClient(): Promise<SupabaseClient> {
  if (client) return client;
  if (!configPromise) configPromise = fetchConfig();
  const { supabaseUrl, supabaseAnonKey } = await configPromise;
  client = createClient(supabaseUrl, supabaseAnonKey);
  return client;
}
