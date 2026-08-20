import createMiddleware from "next-intl/middleware"
import { routing } from "./i18n/routing"

/**
 * Redirige vers la bonne langue selon, dans l'ordre :
 *   1. le témoin NEXT_LOCALE, s'il existe (choix manuel du visiteur) ;
 *   2. l'en-tête Accept-Language envoyé par le navigateur (donc la région) ;
 *   3. la langue par défaut définie dans routing.ts.
 */
export default createMiddleware(routing)

export const config = {
  /**
   * On exclut les routes internes de Next.js, les fichiers statiques
   * et tout chemin contenant un point (images, favicon, robots.txt…).
   */
  matcher: ["/((?!api|_next|_vercel|keystatic|.*\..*).*)"],
}
