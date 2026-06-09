import type { NextConfig } from "next";

// Map the legacy Wix URLs to their rebuilt routes so inbound links and search
// authority carry over. 301 (permanent) so engines update their index.
const legacyRedirects: { from: string; to: string }[] = [
  { from: "/investigacion.html", to: "/investigacion" },
  { from: "/participa.html", to: "/participa" },
  { from: "/beneficios.html", to: "/beneficios" },
  { from: "/sobre-nosotros.html", to: "/sobre-nosotros" },
  { from: "/blog.html", to: "/blog" },
  { from: "/blog-1-tienes-riesgo-de-preeclampsia.html", to: "/blog/tienes-riesgo-de-preeclampsia" },
  { from: "/blog-1-tienes-riesgo-de-preeclampsia", to: "/blog/tienes-riesgo-de-preeclampsia" },
  { from: "/blog-2-habitos-alimentarios-copy.html", to: "/blog/habitos-alimentarios" },
  { from: "/blog-2-habitos-alimentarios", to: "/blog/habitos-alimentarios" },
  { from: "/blog-3-como-se-pone-el-mapa.html", to: "/blog/como-se-pone-el-mapa" },
  { from: "/blog-3-como-se-pone-el-mapa", to: "/blog/como-se-pone-el-mapa" },
  { from: "/blog-4-cambios-durante-la-gestacion.html", to: "/blog/cambios-durante-la-gestacion" },
  { from: "/blog-4-cambios-durante-la-gestacion", to: "/blog/cambios-durante-la-gestacion" },
  { from: "/mapa.html", to: "/mapa" },
];

const nextConfig: NextConfig = {
  async redirects() {
    return legacyRedirects.map((r) => ({
      source: r.from,
      destination: r.to,
      permanent: true,
    }));
  },
};

export default nextConfig;
