import { describe, it, expect } from "vitest";
import { ExecMindClient } from "../src/client";
import { verifySignature } from "../src/webhooks/verify";
import crypto from "crypto";

describe("ExecMindClient", () => {
  it("throws if missing apiKey", () => {
    expect(() => new ExecMindClient({} as any)).toThrow("ExecMindClient: apiKey is required");
  });

  it("sets defaults", () => {
    const c = new ExecMindClient({ apiKey: "test-key" });
    expect(c.baseUrl).toBe("https://api.execmind.xyz");
    expect(c.timeoutMs).toBe(15000);
  });
});

describe("verifySignature", () => {
  it("returns true for valid signature", () => {
    const secret = "s3cr3t";
    const body = "hello";
    const hmac = crypto.createHmac("sha256", Buffer.from(secret, "utf8")).update(body).digest("hex");
    expect(verifySignature(body, hmac, secret)).toBe(true);
  });

  it("returns false for invalid signature", () => {
    expect(verifySignature("hello", "bad", "s3cr3t")).toBe(false);
  });
});
