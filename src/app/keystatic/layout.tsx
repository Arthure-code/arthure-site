import { cookies } from "next/headers"
import { notFound, redirect } from "next/navigation"
import type { ReactNode } from "react"

/**
 * Comptes GitHub autorisés à voir l'administration.
 *
 * Keystatic empêche déjà toute écriture sans droit de poussée sur le dépôt :
 * un inconnu se retrouve à travailler sur une copie, et son enregistrement
 * devient une demande de fusion. Ce filtre ajoute une seconde barrière, en
 * amont : les autres ne voient pas l'interface du tout.
 */
const ADMINISTRATEURS = (process.env.KEYSTATIC_ADMINS ?? "Arthure-code")
  .split(",")
  .map((nom) => nom.trim().toLowerCase())
  .filter(Boolean)

/**
 * Identifie le porteur du jeton auprès de GitHub.
 *
 * La vérification se fait ici, côté serveur, et non à partir du témoin :
 * celui-ci n'est pas `httpOnly`, donc modifiable depuis le navigateur.
 * Seule la réponse de GitHub fait foi.
 */
async function identifierPorteur(jeton: string): Promise<string | null> {
  try {
    const reponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${jeton}`,
        Accept: "application/vnd.github+json",
      },
      cache: "no-store",
    })
    if (!reponse.ok) return null

    const donnees: unknown = await reponse.json()
    const identifiant = (donnees as { login?: unknown }).login
    return typeof identifiant === "string" ? identifiant : null
  } catch {
    // Réseau indisponible : on refuse plutôt que d'ouvrir par défaut.
    return null
  }
}

/**
 * L'interface d'administration a sa propre racine HTML : elle ne doit
 * hériter ni de la barre de navigation, ni des styles Bootstrap du site.
 * Elle vit aussi hors du système de langues, d'où son emplacement en
 * dehors du segment [locale].
 */
export default async function KeystaticLayout({
  children,
}: {
  children: ReactNode
}) {
  // En mode fichiers locaux, l'administration n'est servie que sur la machine
  // du développeur : aucune authentification GitHub n'existe à vérifier.
  if (process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE === "github") {
    const jeton = (await cookies()).get("keystatic-gh-access-token")?.value

    // Sans jeton, on lance la connexion GitHub plutôt que de refuser :
    // c'est le cas normal d'une première visite ou d'une session expirée.
    if (!jeton) redirect("/api/keystatic/github/login")

    const porteur = await identifierPorteur(jeton)
    if (!porteur || !ADMINISTRATEURS.includes(porteur.toLowerCase())) {
      // Volontairement une page introuvable, et non un refus : rien
      // n'indique à un inconnu qu'une administration existe ici.
      notFound()
    }
  }

  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
