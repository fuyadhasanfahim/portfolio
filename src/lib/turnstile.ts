/**
 * Server-side verification of a Cloudflare Turnstile token.
 * https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
 */

export type TurnstileResult =
  | { ok: true }
  | { ok: false; reason: string };

export async function verifyTurnstile(
  token: string,
  ip?: string
): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    // Misconfiguration: fail closed so spam protection cannot be bypassed.
    const reason = "TURNSTILE_SECRET_KEY is not set";
    console.error(`[contact] Turnstile: ${reason}`);
    return { ok: false, reason };
  }

  if (!token) {
    const reason = "No Turnstile token was sent from the client";
    console.error(`[contact] Turnstile: ${reason}`);
    return { ok: false, reason };
  }

  const body = new URLSearchParams();
  body.append("secret", secret);
  body.append("response", token);
  if (ip && ip !== "unknown") body.append("remoteip", ip);

  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body }
    );
    const data = (await res.json()) as {
      success: boolean;
      "error-codes"?: string[];
    };
    if (data.success === true) return { ok: true };

    const codes = data["error-codes"]?.join(", ") || "unknown";
    const reason = `Turnstile rejected the token (error-codes: ${codes})`;
    console.error(`[contact] Turnstile: ${reason}`);
    return { ok: false, reason };
  } catch (err) {
    const reason = "Turnstile verification request failed (network)";
    console.error(`[contact] Turnstile: ${reason}`, err);
    return { ok: false, reason };
  }
}
