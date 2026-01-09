import crypto from "crypto";

export function verifySignature(rawBody: string | Buffer, signature: string, secret: string): boolean {
  const key = Buffer.from(secret, "utf8");
  const hmac = crypto.createHmac("sha256", key).update(rawBody).digest("hex");

  const sigBuffer = Buffer.from(signature, "utf8");
  const hmacBuffer = Buffer.from(hmac, "utf8");

  // constant-time compare
  if (sigBuffer.length !== hmacBuffer.length) return false;
  return crypto.timingSafeEqual(sigBuffer, hmacBuffer);
}
