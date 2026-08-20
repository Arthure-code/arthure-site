import { defineRouting } from "next-intl/routing"

/**
 * Langues offertes par le site.
 * Français et anglais couvrent le marché canadien ; les quatre autres
 * figurent parmi les langues les plus représentées dans l'industrie
 * du logiciel et permettent une lecture directe depuis l'étranger.
 */
export const locales = ["fr", "en", "es", "pt", "de", "it"] as const
export type Locale = (typeof locales)[number]

/** Nom de chaque langue, écrit dans cette langue (endonyme). */
export const localeNames: Record<Locale, string> = {
  fr: "Français",
  en: "English",
  es: "Español",
  pt: "Português",
  de: "Deutsch",
  it: "Italiano",
}

/** Étiquette courte affichée dans la barre de navigation. */
export const localeShort: Record<Locale, string> = {
  fr: "FR",
  en: "EN",
  es: "ES",
  pt: "PT",
  de: "DE",
  it: "IT",
}

export const routing = defineRouting({
  locales,

  /**
   * Français par défaut : le site s'adresse d'abord au marché québécois.
   * Cette valeur ne sert que de repli, quand la langue du visiteur
   * n'est pas prise en charge ou qu'aucune préférence n'est envoyée.
   */
  defaultLocale: "fr",

  /**
   * Détection automatique à partir de l'en-tête Accept-Language du navigateur,
   * qui reflète la région et les préférences réelles du visiteur.
   * Le choix manuel est mémorisé dans un témoin (cookie NEXT_LOCALE)
   * et prime sur la détection lors des visites suivantes.
   */
  localeDetection: true,

  /**
   * Chaque langue a son propre préfixe d'URL, y compris la langue par défaut.
   * Cela donne une adresse canonique distincte par langue, ce qui est
   * nécessaire pour que les moteurs de recherche les indexent séparément.
   */
  localePrefix: "always",
})
