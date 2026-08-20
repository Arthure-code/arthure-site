import { useTranslations } from "next-intl"
import Image from "next/image"
import ProjectGallery from "@/components/ProjectGallery"
import TechChip from "@/components/TechChip"
import type { ProjetAffiche } from "@/lib/projects"

/**
 * Liste des projets. Les données viennent des fichiers gérés depuis
 * l'administration (/keystatic) : ajouter un projet ne demande plus
 * de toucher au code.
 */
export default function Projects({ projets }: { projets: ProjetAffiche[] }) {
  const t = useTranslations("projects")

  if (projets.length === 0) return null

  return (
    <section id="projets" className="section section--alt">
      <div className="container">
        <h2 className="section-title h1 mb-2">{t("sectionTitle")}</h2>
        <p className="section-lead mb-5">{t("sectionLead")}</p>

        <div className="row g-4">
          {projets.map(projet => (
            <div key={projet.slug} className="col-lg-6">
              <article className="ald-card h-100 overflow-hidden d-flex flex-column">
                <div className="d-flex flex-column h-100">
                  <div className="p-4">
                    <div className="d-flex justify-content-between align-items-start gap-2 mb-1">
                      <h3 className="h4 fw-bold mb-0">{projet.titre}</h3>
                      {projet.annee && (
                        <span className="small text-muted-ald flex-shrink-0">{projet.annee}</span>
                      )}
                    </div>
                    <p className="text-muted-ald mb-3">{projet.accroche}</p>
                    <p className="mb-4">{projet.description}</p>

                    {projet.captures.length > 0 && (
                      <div className="mb-4">
                        <ProjectGallery captures={projet.captures} titre={projet.titre} />
                      </div>
                    )}

                    <div className="d-flex flex-wrap gap-2">
                      {projet.depot && (
                        <a
                          href={projet.depot}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline-primary"
                        >
                          {t("viewCode")}
                        </a>
                      )}
                      {projet.sonarProject && (
                        <a
                          href={`https://sonarcloud.io/summary/overall?id=${projet.sonarProject}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline-secondary"
                        >
                          {t("viewAnalysis")}
                        </a>
                      )}
                    </div>
                  </div>

                  <div
                    className="p-4 project-split flex-grow-1"
                    style={{ backgroundColor: "var(--ald-surface-alt)" }}
                  >
                    {projet.points.length > 0 && (
                      <>
                        <h4 className="text-uppercase small fw-semibold text-muted-ald mb-2">
                          {t("highlights")}
                        </h4>
                        <ul className="mb-4 ps-3">
                          {projet.points.map((point, i) => (
                            <li key={i} className="mb-1">
                              {point}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    {projet.note && (
                      <p className="small text-muted-ald fst-italic mb-4">{projet.note}</p>
                    )}

                    {projet.technologies.length > 0 && (
                      <>
                        <h4 className="text-uppercase small fw-semibold text-muted-ald mb-2">
                          {t("stack")}
                        </h4>
                        <div className="d-flex flex-wrap gap-2 mb-4">
                          {projet.technologies.map(tech => (
                            <TechChip key={tech.nom} tech={{ label: tech.nom, icon: tech.logo }} />
                          ))}
                        </div>
                      </>
                    )}

                    {/* Badges servis en direct par SonarCloud : ils reflètent
                        l'état réel du dépôt au moment de la visite. */}
                    {projet.badges.length > 0 && (
                      <div className="d-flex flex-wrap gap-2 align-items-center">
                        {projet.badges.map(badge => (
                          <Image
                            key={badge.src}
                            src={badge.src}
                            alt={badge.alt}
                            width={128}
                            height={20}
                            unoptimized
                            style={{ height: "20px", width: "auto" }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
