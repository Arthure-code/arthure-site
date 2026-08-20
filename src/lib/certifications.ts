import { readdir, readFile } from "node:fs/promises"
import { join } from "node:path"

/**
 * Lecture des certifications depuis les fichiers écrits par l'administration
 * Keystatic (content/certifications/*.json).
 *
 * Même principe que pour les projets : les fichiers sont lus au moment de la
 * construction, la page reste statique, et il n'y a aucune base de données.
 */

const DOSSIER = join(process.cwd(), "content", "certifications")

/** Forme exacte d'un fichier produit par Keystatic. */
interface FichierCertification {
  code: string
  nom: string
  emetteur: string
  annee: string
  badge: string
  lienVerification: string
  ordre?: number
  publie?: boolean
}

/** Certification prête à afficher. */
export interface CertificationAffichee {
  code: string
  nom: string
  emetteur: string
  annee: string
  badge: string
  lienVerification: string
}

export async function chargerCertifications(): Promise<CertificationAffichee[]> {
  let fichiers: string[]
  try {
    fichiers = (await readdir(DOSSIER)).filter(nom => nom.endsWith(".json"))
  } catch {
    // Aucune certification saisie : la section disparaît d'elle-même.
    return []
  }

  const brutes = await Promise.all(
    fichiers.map(async nom => {
      const contenu = await readFile(join(DOSSIER, nom), "utf-8")
      return JSON.parse(contenu) as FichierCertification
    })
  )

  return brutes
    .filter(certification => certification.publie !== false)
    .sort((a, b) => (a.ordre ?? 100) - (b.ordre ?? 100))
    .map(certification => ({
      code: certification.code,
      nom: certification.nom,
      emetteur: certification.emetteur,
      annee: certification.annee,
      badge: certification.badge,
      lienVerification: certification.lienVerification,
    }))
}
