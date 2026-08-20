import Image from "next/image"
import { techLogo, type Tech } from "@/data/site"

/**
 * Pastille « logo officiel + nom » pour une technologie.
 * Le logo provient du CDN Devicon ou de Simple Icons : ce sont les fichiers
 * d'origine publiés par chaque projet, pas des images redessinées.
 * Quand aucune source officielle n'existe, la pastille reste en texte seul.
 */
export default function TechChip({ tech }: { tech: Tech }) {
  const src = tech.iconUrl ?? (tech.icon ? techLogo(tech.icon, tech.variant) : null)

  return (
    <span className="tech-chip">
      {src && (
        <Image src={src} alt="" width={18} height={18} unoptimized aria-hidden="true" />
      )}
      {tech.label}
    </span>
  )
}
