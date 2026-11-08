/** Typed, SSR-safe helper for pushing events to the GTM dataLayer. */

declare global {
    interface Window {
        dataLayer?: Record<string, unknown>[];
    }
}

/**
 * Push a custom event to `window.dataLayer`. No-op on the server. Never pass
 * personal data (name, email, message) here — only non-identifying fields.
 */
export function pushEvent(
    event: string,
    params: Record<string, unknown> = {},
) {
    if (typeof window === 'undefined') return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...params });
}
