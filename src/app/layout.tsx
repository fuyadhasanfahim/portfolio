import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  display: "swap",
  weight: "variable",
  subsets: ["latin"],
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  title: "Fuyad Hasan Fahim | Portfolio",
  description:
    "Explore the portfolio of Fuyad Hasan Fahim, showcasing a diverse range of projects and skills in web development, design, and technology. Discover innovative solutions and creative works that highlight expertise and passion in the field.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${archivo.variable} antialiased bg-stone-200 text-stone-900 font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
