import type { MetadataRoute } from "next"
import { siteUrl } from "@/data/site"
import { locales, routing } from "@/i18n/routing"

/**
 * Plan du site, servi à /sitemap.xml.
 *
 * Il ne contient qu'une page par langue : le portfolio tient sur une seule
 * page. Son intérêt n'est donc pas la découverte de pages profondes, mais
 * de déclarer explicitement les six versions linguistiques et leurs
 * correspondances, ce qu'un robot ne devinerait pas depuis les liens.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // Chaque version renvoie vers toutes les autres, y compris elle-même :
  // c'est ce que demande la spécification hreflang.
  const languages = Object.fromEntries(
    locales.map(locale => [locale, `${siteUrl}/${locale}`])
  )

  // La déclaration d'accessibilité existe elle aussi dans les six langues.
  const languagesAccessibilite = Object.fromEntries(
    locales.map(locale => [locale, `${siteUrl}/${locale}/accessibilite`])
  )

  return [
    ...locales.map(locale => ({
      url: `${siteUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      // La langue par défaut est celle servie aux visiteurs dont la langue
      // n'est pas offerte : elle mérite un rang supérieur.
      priority: locale === routing.defaultLocale ? 1 : 0.8,
      alternates: { languages },
    })),
    ...locales.map(locale => ({
      url: `${siteUrl}/${locale}/accessibilite`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
      alternates: { languages: languagesAccessibilite },
    })),
  ]
}
