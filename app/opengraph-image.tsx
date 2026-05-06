import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const runtime = "edge";
export const alt =
  "Affina AI · AI consulting for boutique businesses in Portland";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
type FontStyle = "normal" | "italic";

type FontEntry = {
  name: string;
  data: ArrayBuffer;
  weight: FontWeight;
  style: FontStyle;
};

// Fetch a font file buffer from the Google Fonts CSS API.
// Returns null on any network or parse failure so the image always renders.
async function fetchGoogleFontBuffer(
  family: string,
  weight: FontWeight,
  style: FontStyle = "normal",
): Promise<ArrayBuffer | null> {
  try {
    // Build the Google Fonts CSS2 URL for this single variant
    const ital = style === "italic" ? "1" : "0";
    const axis = style === "italic" ? `ital,wght@${ital},${weight}` : `wght@${weight}`;
    const cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:${axis}&display=swap`;

    const cssRes = await fetch(cssUrl, {
      headers: {
        // Old IE UA: Google Fonts serves TTF (not WOFF2) to user agents that
        // don't support WOFF2. satori (the renderer behind next/og) cannot
        // parse WOFF2, so we ask Google Fonts for TTF instead.
        "User-Agent":
          "Mozilla/4.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)",
      },
    });
    if (!cssRes.ok) return null;

    const css = await cssRes.text();
    // Match TTF or WOFF (both satori-compatible). Never WOFF2.
    const match = css.match(
      /url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.(?:ttf|woff))\)/,
    );
    if (!match) return null;

    const fontRes = await fetch(match[1]);
    if (!fontRes.ok) return null;

    const buf = await fontRes.arrayBuffer();
    // Belt-and-suspenders: reject WOFF2 by signature in case the URL pattern
    // shifts. WOFF2 signature is the four bytes 'wOF2' (0x77 0x4F 0x46 0x32).
    const sig = new Uint8Array(buf, 0, 4);
    if (
      sig[0] === 0x77 &&
      sig[1] === 0x4f &&
      sig[2] === 0x46 &&
      sig[3] === 0x32
    ) {
      return null;
    }
    return buf;
  } catch {
    return null;
  }
}

export default async function Image() {
  // Fetch all font variants in parallel; any individual failure is tolerated
  const [frauncesData, bodoniNormalData, bodoniItalicData] = await Promise.all([
    fetchGoogleFontBuffer("Fraunces", 300),
    fetchGoogleFontBuffer("Bodoni Moda", 500, "normal"),
    fetchGoogleFontBuffer("Bodoni Moda", 500, "italic"),
  ]);

  const fonts: FontEntry[] = [];

  if (frauncesData) {
    fonts.push({ name: "Fraunces", data: frauncesData, weight: 300, style: "normal" });
  }
  if (bodoniNormalData) {
    fonts.push({ name: "Bodoni Moda", data: bodoniNormalData, weight: 500, style: "normal" });
  }
  if (bodoniItalicData) {
    fonts.push({ name: "Bodoni Moda", data: bodoniItalicData, weight: 500, style: "italic" });
  }

  const wordmarkFamily = bodoniNormalData ? "Bodoni Moda, Georgia, serif" : "Georgia, serif";
  const taglineFamily = frauncesData ? "Fraunces, Georgia, serif" : "Georgia, serif";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#f4efe8",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: "96px",
          paddingRight: "96px",
          paddingTop: "0px",
          paddingBottom: "0px",
        }}
      >
        {/* Wordmark: upright "Affina " then italic rose "AI" */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontFamily: wordmarkFamily,
            fontWeight: 500,
            fontSize: "72px",
            lineHeight: 1,
            marginBottom: "32px",
          }}
        >
          <span style={{ color: "#2b2722", fontStyle: "normal" }}>Affina&nbsp;</span>
          <span style={{ color: "#b88574", fontStyle: "italic" }}>AI</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontFamily: taglineFamily,
            fontWeight: 300,
            fontStyle: "normal",
            fontSize: "36px",
            lineHeight: 1.35,
            color: "#2b2722",
            marginBottom: "40px",
            maxWidth: "800px",
          }}
        >
          {SITE.tagline}
        </div>

        {/* Vertical eyebrow */}
        <div
          style={{
            fontFamily: "sans-serif",
            fontWeight: 400,
            fontSize: "15px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#8a8278",
          }}
        >
          Med spas · Beauty · Fitness · Crafts
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fonts.length > 0 ? fonts : undefined,
    },
  );
}
