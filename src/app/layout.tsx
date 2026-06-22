    import type { Metadata } from "next";
    import { Inter, Space_Grotesk, Instrument_Serif } from "next/font/google";
    import "./globals.css";
    import { profile } from "@/lib/data";
    import Nav from "@/components/Nav";
    import Footer from "@/components/Footer";
    import GrainOverlay from "@/components/GrainOverlay";
    import SmoothScroll from "@/components/SmoothScroll";
    import SiteBackground from "@/components/SiteBackground";
    import ScrollToTop from "@/components/ScrollToTop";
    import PageTransition from "@/components/PageTransition";
    import MetaPixel from "@/components/MetaPixel";

    const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
    });

    const display = Space_Grotesk({
    subsets: ["latin"],
    weight: ["500", "600", "700"],
    variable: "--font-display",
    display: "swap",
    });

    const serif = Instrument_Serif({
    subsets: ["latin"],
    weight: "400",
    style: "italic",
    variable: "--font-serif",
    display: "swap",
    });

    export const metadata: Metadata = {
    metadataBase: new URL("https://fuyad.dev"),
    title: {
        default: `${profile.name} — ${profile.role}`,
        template: `%s — ${profile.name}`,
    },
    description: profile.blurb,
    openGraph: {
        title: `${profile.name} — ${profile.role}`,
        description: profile.blurb,
        type: "website",
    },
    };

    export default function RootLayout({
    children,
    }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html
        lang="en"
        data-scroll-behavior="smooth"
        className={`${inter.variable} ${display.variable} ${serif.variable}`}
        >
        <body className="min-h-screen antialiased">
            <MetaPixel />
            <SmoothScroll />
            <ScrollToTop />
            <PageTransition />
            <SiteBackground />
            <GrainOverlay />
            <Nav />
            <main>{children}</main>
            <Footer />
        </body>
        </html>
    );
    }
