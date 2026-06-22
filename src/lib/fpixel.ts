/** Meta (Facebook) Pixel id and typed, SSR-safe helpers. */
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
