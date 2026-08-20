import { useTranslations } from "next-intl"
import Image from "next/image"
import type { CertificationAffichee } from "@/lib/certifications"

export default function Certifications({
  certifications,
}: {
  certifications: CertificationAffichee[]
}) {
  const t = useTranslations("certifications")

  // Aucune certification saisie : la section entière disparaît, plutôt
  // qu'un titre suivi du vide.
  if (certifications.length === 0) return null

  return (
    <section id="certifications" className="section section--alt">
      <div className="container">
        <h2 className="section-title h1 mb-2">{t("sectionTitle")}</h2>
        <p className="section-lead mb-5">{t("sectionLead")}</p>

        <div className="row g-4 justify-content-center">
          {certifications.map(cert => (
            <div key={cert.code} className="col-6 col-lg-3">
              <a
                href={cert.lienVerification}
                target="_blank"
                rel="noopener noreferrer"
                className="ald-card d-flex flex-column align-items-center text-center h-100 p-4 text-decoration-none"
              >
                {/* Badge officiel du certificateur, servi localement. */}
                <Image
                  src={cert.badge}
                  alt=""
                  width={104}
                  height={104}
                  aria-hidden="true"
                  className="mb-3"
                  style={{ width: "104px", height: "104px", objectFit: "contain" }}
                />

                <span className="fw-bold mb-1" style={{ color: "var(--ald-ink)" }}>
                  {cert.code}
                </span>

                <span
                  className="small mb-2 flex-grow-1"
                  style={{ color: "var(--ald-ink)", lineHeight: 1.35 }}
                >
                  {cert.nom}
                </span>

                <span className="small text-muted-ald mb-3">
                  {cert.emetteur} · {cert.annee}
                </span>

                <span className="small fw-semibold mt-auto" style={{ color: "var(--ald-accent)" }}>
                  {t("verify")} ↗
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
