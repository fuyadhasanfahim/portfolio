import type { Metadata } from "next";
import "./globals.css";
import "./resume.css";
import SiteFrame from "@/components/SiteFrame";

export const metadata: Metadata = {
  metadataBase: new URL("https://fuyadhasanfahim.com"),
  title: { default: "Fuyad Hasan Fahim | Full-Stack Developer", template: "%s | Fuyad Hasan Fahim" },
  description: "Selected projects, experience and contact details for Fuyad Hasan Fahim, a full-stack developer in Bangladesh.",
  applicationName: "Fuyad Hasan Fahim",
  authors: [{ name: "Fuyad Hasan Fahim", url: "https://fuyadhasanfahim.com" }],
  creator: "Fuyad Hasan Fahim",
  publisher: "Fuyad Hasan Fahim",
  keywords: ["Fuyad Hasan Fahim", "full-stack developer", "Next.js developer", "Node.js developer", "Bangladesh"],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  openGraph: { type: "website", url: "/", title: "Fuyad Hasan Fahim | Full-Stack Developer", description: "Selected projects, experience and contact details for Fuyad Hasan Fahim, a full-stack developer in Bangladesh.", siteName: "Fuyad Hasan Fahim", locale: "en_US", images: [{ url: "/resume/portrait.png", width: 1200, height: 1200, alt: "Fuyad Hasan Fahim" }] },
  twitter: { card: "summary_large_image", title: "Fuyad Hasan Fahim | Full-Stack Developer", description: "Selected projects, experience and contact details for Fuyad Hasan Fahim.", images: ["/resume/portrait.png"] }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><SiteFrame>{children}</SiteFrame></body></html>;
}
