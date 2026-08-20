import type { routing } from "@/i18n/routing"
import type messages from "../messages/fr.json"

/**
 * Typage des traductions.
 *
 * En déclarant ici la forme des messages, TypeScript connaît toutes les clés
 * existantes : `t("hero.role")` est validé à la compilation, et une clé mal
 * orthographiée ou supprimée fait échouer le build au lieu d'afficher
 * l'identifiant brut en production.
 *
 * Le fichier français sert de référence puisque c'est la langue par défaut.
 */
declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number]
    Messages: typeof messages
  }
}
