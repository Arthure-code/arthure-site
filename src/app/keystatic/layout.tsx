import type { ReactNode } from "react"

/**
 * L'interface d'administration a sa propre racine HTML : elle ne doit
 * hériter ni de la barre de navigation, ni des styles Bootstrap du site.
 * Elle vit aussi hors du système de langues, d'où son emplacement en
 * dehors du segment [locale].
 */
export default function KeystaticLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
