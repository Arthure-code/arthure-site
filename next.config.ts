import createNextIntlPlugin from "next-intl/plugin"
import type { NextConfig } from "next"

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts")

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    /**
     * Logos officiels des technologies, servis par le CDN public de Devicon
     * (dépôt devicons/devicon, licence MIT) et par Simple Icons.
     * Aucune image n'est générée : ce sont les logos d'origine des projets.
     */
    remotePatterns: [
      { protocol: "https", hostname: "cdn.jsdelivr.net" },
      { protocol: "https", hostname: "cdn.simpleicons.org" },
      { protocol: "https", hostname: "sonarcloud.io" },
      { protocol: "https", hostname: "img.shields.io" },
      { protocol: "https", hostname: "learn.microsoft.com" },
    ],
  },
}

export default withNextIntl(nextConfig)
