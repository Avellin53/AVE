import { Router, type IRouter } from "express";
import { HealthCheckResponse } from "@workspace/api-zod";
import { supabase } from "../config/supabase";

const router: IRouter = Router();

router.get("/healthz", async (req, res) => {
  const { error } = await supabase.from("_healthz").select("*").limit(1);

  const isNetworkError =
    error !== null &&
    (error.message.toLowerCase().includes("fetch") ||
      error.message.toLowerCase().includes("network") ||
      error.message.toLowerCase().includes("econnrefused"));

  if (isNetworkError) {
    req.log.error({ err: error }, "Supabase database ping failed");
    res.status(503).json({ status: "error", message: "Unable to reach Supabase database" });
    return;
  }

  const data = HealthCheckResponse.parse({ status: "ok" });
  res.json(data);
});

export default router;
