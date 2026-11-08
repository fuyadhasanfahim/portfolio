import Script from "next/script";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

/**
 * Loads the Google Tag Manager container once for the whole site, using the
 * standard GTM snippet (it pushes `gtm.start` + the `gtm.js` event that
 * Page View / All Pages triggers depend on).
 * The container id comes from NEXT_PUBLIC_GTM_ID (the NEXT_PUBLIC_ prefix is
 * required because the id is used in the browser). Renders nothing if unset.
 */
export default function GoogleTagManager() {
    if (!GTM_ID) {
        if (process.env.NODE_ENV !== "production") {
            console.warn("[GoogleTagManager] NEXT_PUBLIC_GTM_ID is missing");
        }
        return null;
    }

    return (
        <Script id="gtm-loader" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer',${JSON.stringify(GTM_ID)});`}
        </Script>
    );
}
