import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ROSTER_SUMMARY } from "@/lib/creators-seo";

export const alt = "IdeaShapers — strategy-first creative studio and influencer agency in Kolkata";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logo = await readFile(join(process.cwd(), "public/logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column",
          justifyContent: "space-between", padding: 72,
          background: "linear-gradient(150deg, #060d1f 0%, #0f1d4a 45%, #1e2f6e 100%)",
          color: "#fff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ display: "flex", background: "#fff", borderRadius: 20, padding: 12 }}>
            <img src={logoSrc} width={88} height={88} alt="" />
          </div>
          <div style={{ fontSize: 44, fontWeight: 700 }}>IdeaShapers</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 76, lineHeight: 1.05, fontWeight: 700 }}>Transform Ideas Into Impact</div>
          <div style={{ fontSize: 32, color: "rgba(255,255,255,0.7)" }}>{`Branding · Web · Influencer marketing · ${ROSTER_SUMMARY}`}</div>
        </div>
        <div style={{ fontSize: 26, color: "rgba(255,255,255,0.55)" }}>Kolkata, India · ideashapers.org</div>
      </div>
    ),
    size,
  );
}
