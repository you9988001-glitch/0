import express from "express";
import crypto from "crypto";

const router = express.Router();

router.post("/issue-guardian", (req, res) => {
  const issuedAt = new Date().toISOString();
  const guardianId = crypto.randomUUID();

  const payload = {
    guardianId,
    issuedAt,
    authority: "Guardian Authority v1",
    status: "ISSUED"
  };

  const signature = crypto
    .createHash("sha256")
    .update(JSON.stringify(payload))
    .digest("hex");

  res.json({
    ok: true,
    certificate: payload,
    signature
  });
});

export default router;
