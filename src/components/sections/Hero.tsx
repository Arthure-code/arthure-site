import { useTranslations } from "next-intl"
import { contact } from "@/data/site"
import type { Cv } from "@/lib/documents"

export default function Hero({ cv }: { cv: Cv | null }) {
  const t = useTranslations("hero")

  return (
    <header className="section pb-4">
      <div className="container">
        <div className="row">
          <div className="col-lg-9">
            <p className="text-uppercase small fw-semibold mb-2" style={{ color: "var(--ald-accent)", letterSpacing: "0.08em" }}>
              {t("role")} · {t("location")}
            </p>

            <h1 className="display-5 fw-bold mb-3" style={{ letterSpacing: "-0.03em" }}>
              {t("name")}
            </h1>

            <p className="fs-5 mb-3">{t("intro")}</p>
            <p className="text-muted-ald mb-4">{t("intro2")}</p>

            <div className="d-flex flex-wrap gap-2 align-items-center">
              <a href="#projets" className="btn btn-primary px-4">
                {t("ctaProjects")}
              </a>
              <a href={`mailto:${contact.email}`} className="btn btn-outline-secondary px-4">
                {t("ctaContact")}
              </a>
              {/* Le bouton n'existe que si un document a été déposé dans
                  l'administration : le retirer là-bas le fait disparaître
                  ici, sans laisser d'adresse morte.
                  `download` propose l'enregistrement plutôt que l'ouverture
                  dans le navigateur, et impose le nom du fichier reçu. */}
              {cv && (
                <a
                  href={cv.url}
                  download={cv.nomFichier}
                  className="btn btn-outline-secondary px-4"
                >
                  {t("downloadCv")}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
