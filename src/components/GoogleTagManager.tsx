import Script from 'next/script';

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

/**
 * Loads the Google Tag Manager container once for the whole site.
 * The container id comes from NEXT_PUBLIC_GTM_ID (the NEXT_PUBLIC_ prefix is
 * required because the id is used in the browser). Renders nothing if unset.
 */
export default function GoogleTagManager() {
    if (!GTM_ID) {
        if (process.env.NODE_ENV !== 'production') {
            console.warn('[GoogleTagManager] NEXT_PUBLIC_GTM_ID is missing');
        }
        return null;
    }

    return (
        <>
            <Script
                id="gtm-loader"
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
            />
            <Script id="gtm-init" strategy="afterInteractive">
                {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());`}
            </Script>
        </>
    );
}
