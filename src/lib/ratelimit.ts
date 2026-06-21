import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * Rate limit: max 5 contact submissions per IP per hour.
 *
 * Uses Upstash Redis when its env vars are set (durable, works across
 * instances). Falls back to a per-process in-memory limiter otherwise, so the
 * form still resists abuse in local/dev or single-instance deploys without
 * Upstash. The fallback resets on restart and is not shared between instances.
 */

const LIMIT = 5;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

const hasUpstash =
  !!process.env.UPSTASH_REDIS_REST_URL &&
  !!process.env.UPSTASH_REDIS_REST_TOKEN;

const upstash = hasUpstash
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(LIMIT, "1 h"),
      prefix: "ratelimit:contact",
      analytics: false,
    })
  : null;

// In-memory fallback: ip -> timestamps of recent hits within the window.
const hits = new Map<string, number[]>();

function memoryLimit(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= LIMIT) {
    hits.set(ip, recent);
    return false;
  }
  recent.push(now);
  hits.set(ip, recent);
  return true;
}

export async function checkRateLimit(ip: string): Promise<boolean> {
  if (upstash) {
    const { success } = await upstash.limit(ip);
    return success;
  }
  return memoryLimit(ip);
}
