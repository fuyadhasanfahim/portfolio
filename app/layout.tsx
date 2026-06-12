import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { site } from './lib/site';
import { GrainOverlay } from './components/shared/grain-overlay';

const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin'],
    display: 'swap',
});

const display = Space_Grotesk({
    variable: '--font-display',
    subsets: ['latin'],
    display: 'swap',
    weight: ['400', '500', '600', '700'],
});

const mono = JetBrains_Mono({
    variable: '--font-mono',
    subsets: ['latin'],
    display: 'swap',
    weight: ['400', '500', '600'],
});

export const viewport: Viewport = {
    themeColor: '#0b0b0f',
    colorScheme: 'dark',
    width: 'device-width',
    initialScale: 1,
};

export const metadata: Metadata = {
    metadataBase: new URL(site.url),
    title: {
        default: site.title,
        template: `%s · ${site.shortName}`,
    },
    description: site.description,
    keywords: [
        'Full Stack Developer',
        'SaaS Engineer',
        'Backend Architecture',
        'Real-time Systems',
        'Automation',
        'Next.js',
        'Node.js',
        'TypeScript',
        'Web Briks',
    ],
    authors: [{ name: site.shortName, url: site.url }],
    creator: site.shortName,
    alternates: {
        canonical: site.url,
    },
    openGraph: {
        type: 'website',
        url: site.url,
        title: site.title,
        description: site.description,
        siteName: site.shortName,
    },
    twitter: {
        card: 'summary_large_image',
        title: site.title,
        description: site.description,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
        },
    },
};

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.shortName,
    url: site.url,
    email: `mailto:${site.email}`,
    jobTitle: site.role,
    worksFor: {
        '@type': 'Organization',
        name: site.company,
    },
    sameAs: [
        site.socials.github,
        site.socials.linkedin,
        site.socials.instagram,
    ],
    knowsAbout: [
        'Full Stack Development',
        'Backend Architecture',
        'Real-time Systems',
        'Automation Engineering',
        'API Engineering',
        'Next.js',
        'Node.js',
        'TypeScript',
        'PostgreSQL',
    ],
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html
            lang="en"
            className={`${inter.variable} ${display.variable} ${mono.variable}`}
            suppressHydrationWarning
        >
            <body className="relative min-h-svh bg-background text-foreground antialiased">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <GrainOverlay />
                {children}

                <script>
                    {`!function(f,b,e,v,n,t,s)
                        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                        n.queue=[];t=b.createElement(e);t.async=!0;
                        t.src=v;s=b.getElementsByTagName(e)[0];
                        s.parentNode.insertBefore(t,s)}(window, document,'script',
                        'https://connect.facebook.net/en_US/fbevents.js');
                        fbq('init', ${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID});
                        fbq('track', 'PageView');`}
                </script>
                <noscript>
                    <img
                        height="1"
                        width="1"
                        style={{
                            display: 'none',
                        }}
                        src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}&ev=PageView&noscript=1`}
                    />
                </noscript>
            </body>
        </html>
    );
}
