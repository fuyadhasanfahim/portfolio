/** Meta (Facebook) Pixel id and typed, SSR-safe helpers. */

/**
 * Read from NEXT_PUBLIC_META_PIXEL_ID (the NEXT_PUBLIC_ prefix is required for a
 * value used in the browser) and fall back to the hardcoded id so the pixel
 * still initializes if the env var is ever missing.
 */
export const FB_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID || "930003303431279";

declare global {
    interface Window {
        fbq?: (...args: unknown[]) => void;
    }
}

/** Fire a PageView. No-op if the pixel script hasn't loaded (e.g. on the server). */
export function pageview() {
    if (typeof window !== 'undefined') window.fbq?.('track', 'PageView');
}

/** Fire a standard Meta event, e.g. track("Lead"). Guarded so it never throws. */
export function track(event: string, options: Record<string, unknown> = {}) {
    if (typeof window !== 'undefined') window.fbq?.('track', event, options);
}
