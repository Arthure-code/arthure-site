import { readdir, readFile } from "node:fs/promises"
import { join } from "node:path"
import type { Locale } from "@/i18n/routing"

/**
 * Lecture des projets depuis les fichiers écrits par l'administration
 * Keystatic (content/projets/*.json).
 *
 * Aucune base de données : les fichiers sont lus au moment de la
 * construction du site, donc les pages restent statiques et rapides.
 */

const DOSSIER = join(process.cwd(), "content", "projets")

/** Forme exacte d'un fichier produit par Keystatic. */
interface FichierProjet {
  titre: string
  annee?: string
  ordre?: number
  publie?: boolean
  fr: TextesProjet
  en: TextesProjet
  depot?: string
  sonarProject?: string
  technologies?: Array<{ nom: string; logo: string }>
  captures?: Array<{ image: string; legendeFr?: string; legendeEn?: string }>
}

interface TextesProjet {
  accroche?: string
  description?: string
  points?: string[]
  note?: string
}

/** Projet prêt à afficher, déjà résolu dans une langue. */
export interface ProjetAffiche {
  slug: string
  titre: string
  annee: string
  accroche: string
  description: string
  points: string[]
  note: string
  depot: string
  sonarProject: string
  technologies: Array<{ nom: string; logo: string }>
  captures: Array<{ image: string; legende: string }>
  /** Badges SonarCloud, vides si le projet n'est pas analysé. */
  badges: Array<{ alt: string; src: string }>
}

const METRIQUES = [
  { cle: "alert_status", nom: "Quality Gate" },
  { cle: "security_rating", nom: "Sécurité" },
  { cle: "reliability_rating", nom: "Fiabilité" },
  { cle: "sqale_rating", nom: "Maintenabilité" },
]

function badgesSonar(projet: string, titre: string) {
  if (!projet) return []
  return METRIQUES.map(m => ({
    alt: `${m.nom} — ${titre}`,
    src: `https://sonarcloud.io/api/project_badges/measure?project=${projet}&metric=${m.cle}`,
  }))
}

/**
 * Charge tous les projets publiés, traduits dans la langue demandée.
 *
 * Le contenu n'est saisi qu'en français et en anglais : pour les autres
 * langues, on retombe sur l'anglais, qui reste compréhensible d'un public
 * international. L'interface, elle, est bien traduite dans les six langues.
 */
export async function chargerProjets(locale: Locale): Promise<ProjetAffiche[]> {
  let fichiers: string[]
  try {
    fichiers = (await readdir(DOSSIER)).filter(f => f.endsWith(".json"))
  } catch {
    // Le dossier n'existe pas encore : aucun projet à afficher.
    return []
  }

  const projets = await Promise.all(
    fichiers.map(async fichier => {
      const brut = await readFile(join(DOSSIER, fichier), "utf8")
      const data = JSON.parse(brut) as FichierProjet
      const slug = fichier.replace(/\.json$/, "")

      const textes = locale === "fr" ? data.fr : data.en
      const secours = data.fr
      const enFr = locale === "fr"

      return {
        slug,
        titre: data.titre,
        annee: data.annee ?? "",
        ordre: data.ordre ?? 100,
        publie: data.publie !== false,
        accroche: textes?.accroche || secours?.accroche || "",
        description: textes?.description || secours?.description || "",
        points: textes?.points?.length ? textes.points : (secours?.points ?? []),
        note: textes?.note || "",
        depot: data.depot ?? "",
        sonarProject: data.sonarProject ?? "",
        technologies: data.technologies ?? [],
        captures: (data.captures ?? []).map(c => ({
          image: c.image,
          legende: (enFr ? c.legendeFr : c.legendeEn) || c.legendeFr || "",
        })),
        badges: badgesSonar(data.sonarProject ?? "", data.titre),
      }
    })
  )

  return projets
    .filter(p => p.publie)
    .sort((a, b) => a.ordre - b.ordre)
    .map(({ ordre: _ordre, publie: _publie, ...reste }) => reste)
}
