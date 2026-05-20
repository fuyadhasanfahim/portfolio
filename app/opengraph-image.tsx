import { ImageResponse } from "next/og";
import { site } from "./lib/site";

export const runtime = "nodejs";
export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#0b0b0f",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -200,
            left: -120,
            width: 700,
            height: 700,
            borderRadius: 9999,
            background:
              "radial-gradient(closest-side, rgba(34,211,238,0.45), rgba(11,11,15,0))",
            filter: "blur(40px)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -180,
            right: -160,
            width: 620,
            height: 620,
            borderRadius: 9999,
            background:
              "radial-gradient(closest-side, rgba(139,92,246,0.45), rgba(11,11,15,0))",
            filter: "blur(40px)",
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            color: "#a1a1aa",
            fontSize: 22,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontFamily: "ui-monospace, SFMono-Regular, monospace",
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 9999,
              background: "linear-gradient(135deg,#22d3ee,#3b82f6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0b0b0f",
              fontWeight: 700,
              fontSize: 22,
              fontFamily: "system-ui, sans-serif",
            }}
          >
            F
          </div>
          <div style={{ display: "flex" }}>
            Fuyad Hasan Fahim · system builder interface
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            maxWidth: 980,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 88,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              backgroundImage: "linear-gradient(180deg,#ffffff 0%, #d4d4d8 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            I build systems that run businesses.
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#a1a1aa",
              display: "flex",
              gap: 14,
              alignItems: "center",
            }}
          >
            Full Stack Developer · SaaS Builder · Automation Engineer
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#a1a1aa",
            fontSize: 22,
            fontFamily: "ui-monospace, SFMono-Regular, monospace",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 9999,
                background: "#22d3ee",
                display: "flex",
              }}
            />
            available · oct 2024 — present
          </div>
          <div style={{ display: "flex" }}>web briks llc</div>
        </div>
      </div>
    ),
    size
  );
}
