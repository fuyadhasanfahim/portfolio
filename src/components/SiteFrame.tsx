"use client";

import { usePathname } from "next/navigation";
import Nav from "./Nav";
import Footer from "./Footer";
import SiteBackground from "./SiteBackground";
import SmoothScroll from "./SmoothScroll";
import ScrollToTop from "./ScrollToTop";
import PageTransition from "./PageTransition";
import GrainOverlay from "./GrainOverlay";

export default function SiteFrame({ children }: { children: React.ReactNode }) {
  if (usePathname() === "/") return children;
  return <>
    <SmoothScroll />
    <ScrollToTop />
    <PageTransition />
    <SiteBackground />
    <GrainOverlay />
    <Nav />
    <main>{children}</main>
    <Footer />
  </>;
}
