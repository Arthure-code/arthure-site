import { readFile } from "node:fs/promises"
import { join } from "node:path"

/**
 * Lecture du curriculum vitae déposé depuis l'administration Keystatic
 * (content/documents.json).
 *
 * Le fichier lui-même vit dans public/cv et est servi tel quel. Retirer le
 * document dans l'administration vide simplement ce champ, et le bouton de
 * téléchargement disparaît du site : aucune adresse morte n'est laissée.
 */

const FICHIER = join(process.cwd(), "content", "documents.json")

interface FichierDocuments {
  cv?: string | null
  cvNomFichier?: string | null
}

export interface Cv {
  /** Adresse publique du fichier, par exemple /cv/mon-cv.pdf */
  url: string
  /** Nom sous lequel le visiteur reçoit le document. */
  nomFichier: string
}

export async function chargerCv(): Promise<Cv | null> {
  let contenu: string
  try {
    contenu = await readFile(FICHIER, "utf-8")
  } catch {
    // Aucun document n'a encore été déposé.
    return null
  }

  const donnees = JSON.parse(contenu) as FichierDocuments
  if (!donnees.cv) return null

  return {
    url: donnees.cv,
    // À défaut de nom choisi, le navigateur reprend celui de l'adresse.
    nomFichier: donnees.cvNomFichier || donnees.cv.split("/").pop() || "cv.pdf",
  }
}
