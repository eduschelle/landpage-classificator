import { ImageResponse } from "next/og";
import { dictionaries } from "@/content/i18n";
import { site } from "@/content/site";

export const dynamic = "force-static";
export const alt = site.brand;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const signals = [
  ["Strong Buy", "#4f94e2"],
  ["Buy", "#2064b5"],
  ["Hold", "#898781"],
  ["Sell", "#ad3d3d"],
  ["Strong Sell", "#e66767"],
] as const;

export default function Image() {
  const { hero } = dictionaries.en;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0d0d0d",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", fontSize: 32, fontWeight: 600, color: "#c3c2b7" }}>{site.brand}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2 }}>{hero.title}</div>
          <div style={{ display: "flex", gap: 16, marginTop: 40 }}>
            {signals.map(([label, color]) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 22px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.15)",
                  background: "#232321",
                  fontSize: 26,
                }}
              >
                <div style={{ width: 16, height: 16, borderRadius: 999, background: color }} />
                {label}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#898781" }}>{hero.poweredBy} · engschelle.online</div>
      </div>
    ),
    size,
  );
}
