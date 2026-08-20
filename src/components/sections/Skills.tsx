import { useTranslations } from "next-intl"
import TechChip from "@/components/TechChip"
import { skillGroups } from "@/data/site"

export default function Skills() {
  const t = useTranslations("skills")

  return (
    <section id="competences" className="section">
      <div className="container">
        <h2 className="section-title h1 mb-2">{t("sectionTitle")}</h2>
        <p className="section-lead mb-5">{t("sectionLead")}</p>

        {/* Colonnes CSS plutôt qu'une grille : chaque carte garde sa hauteur
            naturelle et les colonnes se remplissent sans laisser de vide. */}
        <div className="skills-columns">
          {skillGroups.map(group => (
            <div key={group.titleKey} className="ald-card p-4 skills-card">
              <h3 className="h6 text-uppercase fw-semibold text-muted-ald mb-3">
                {t(group.titleKey)}
              </h3>
              <div className="d-flex flex-wrap gap-2">
                {group.items.map(tech => (
                  <TechChip key={tech.label} tech={tech} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
