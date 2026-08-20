import { hasLocale } from "next-intl"
import { getRequestConfig } from "next-intl/server"
import { routing } from "./routing"

/**
 * Charge le fichier de traduction correspondant à la langue de la requête.
 * Appelé côté serveur pour chaque rendu.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})
