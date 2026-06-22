'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { FB_PIXEL_ID, pageview } from '@/lib/fpixel';

if (!FB_PIXEL_ID) {
    console.warn('[MetaPixel] missing pixel id');
}

/**
 * Loads the Meta (Facebook) Pixel once via next/script (afterInteractive) and
 * fires PageView on every App Router navigation. The inline snippet fires the
 * first PageView on load, so we skip the initial effect run to avoid counting
 * the landing view twice. All fbq calls are guarded so SSR never breaks.
 */
export default function MetaPixel() {
    const pathname = usePathname();
    const mounted = useRef(false);

    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true;
            return; // first PageView already fired by the inline snippet
        }
        pageview(); // SPA navigation
    }, [pathname]);

    return (
        <>
            <Script
                id="meta-pixel"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${FB_PIXEL_ID}');
fbq('track', 'PageView');`,
                }}
            />
            <noscript>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    height="1"
                    width="1"
                    style={{ display: 'none' }}
                    src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
                    alt=""
                />
            </noscript>
        </>
    );
}
