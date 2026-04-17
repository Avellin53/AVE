import { Router } from "express";

const router = Router();

router.get("/config", (_req, res) => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    res.status(500).json({ error: "Supabase configuration is not set on the server." });
    return;
  }

  res.json({ supabaseUrl, supabaseAnonKey });
});

export default router;
