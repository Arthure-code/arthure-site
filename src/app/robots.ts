import type { MetadataRoute } from "next"
import { siteUrl } from "@/data/site"

/**
 * Directives d'exploration, servies à /robots.txt.
 *
 * Sans ce fichier, rien n'indique aux robots où trouver le plan du site :
 * ils découvrent les pages au hasard des liens entrants.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // L'administration et son API n'ont rien à faire dans un index.
      // Ce n'est pas une mesure de sécurité — celle-ci est dans
      // src/app/keystatic/layout.tsx — mais une question de propreté :
      // ces adresses ne servent aucun visiteur.
      disallow: ["/keystatic", "/api/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
