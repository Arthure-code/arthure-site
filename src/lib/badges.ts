import { readdir, readFile } from "node:fs/promises"
import { join } from "node:path"

/**
 * Lecture des badges d'apprentissage écrits par l'administration Keystatic
 * (content/badges/*.json).
 *
 * Ils sont tenus à l'écart des certifications : un badge récompense un
 * parcours suivi, une certification un examen surveillé. Les mêler
 * affaiblirait les secondes.
 */

const DOSSIER = join(process.cwd(), "content", "badges")

interface FichierBadge {
  nom: string
  emetteur: string
  date?: string
  image: string
  lienVerification?: string
  ordre?: number
  publie?: boolean
}

export interface BadgeAffiche {
  nom: string
  emetteur: string
  date: string
  image: string
  lienVerification: string
}

export async function chargerBadges(): Promise<BadgeAffiche[]> {
  let fichiers: string[]
  try {
    fichiers = (await readdir(DOSSIER)).filter(nom => nom.endsWith(".json"))
  } catch {
    // Aucun badge saisi : la rangée disparaît du pied de page.
    return []
  }

  const brutes = await Promise.all(
    fichiers.map(async nom => {
      const contenu = await readFile(join(DOSSIER, nom), "utf-8")
      return JSON.parse(contenu) as FichierBadge
    })
  )

  return brutes
    .filter(badge => badge.publie !== false)
    .sort((a, b) => (a.ordre ?? 100) - (b.ordre ?? 100))
    .map(badge => ({
      nom: badge.nom,
      emetteur: badge.emetteur,
      date: badge.date ?? "",
      lienVerification: badge.lienVerification ?? "",
      image: badge.image,
    }))
}
