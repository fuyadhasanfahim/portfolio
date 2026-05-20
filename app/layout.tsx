import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { site } from "./lib/site";
import { GrainOverlay } from "./components/shared/grain-overlay";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const viewport: Viewport = {
  themeColor: "#0b0b0f",
  colorScheme: "dark",
  width: "device-width",
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
    "Full Stack Developer",
    "SaaS Engineer",
    "Backend Architecture",
    "Real-time Systems",
    "Automation",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Web Briks",
  ],
  authors: [{ name: site.shortName, url: site.url }],
  creator: site.shortName,
  alternates: {
    canonical: site.url,
  },
  openGraph: {
    type: "website",
    url: site.url,
    title: site.title,
    description: site.description,
    siteName: site.shortName,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.shortName,
  url: site.url,
  email: `mailto:${site.email}`,
  jobTitle: site.role,
  worksFor: {
    "@type": "Organization",
    name: site.company,
  },
  sameAs: [
    site.socials.github,
    site.socials.linkedin,
    site.socials.instagram,
  ],
  knowsAbout: [
    "Full Stack Development",
    "Backend Architecture",
    "Real-time Systems",
    "Automation Engineering",
    "API Engineering",
    "Next.js",
    "Node.js",
    "TypeScript",
    "PostgreSQL",
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
      </body>
    </html>
  );
}
