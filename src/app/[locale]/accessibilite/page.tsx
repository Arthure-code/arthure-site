import { getTranslations, setRequestLocale } from "next-intl/server"
import type { Metadata } from "next"
import { contact, siteUrl } from "@/data/site"
import { locales, type Locale } from "@/i18n/routing"
import { chargerDeclaration } from "@/lib/accessibilite"

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const declaration = chargerDeclaration(locale as Locale)

  return {
    metadataBase: new URL(siteUrl),
    title: `${declaration.titre} — Arthure Lekoubou Djune`,
    description: declaration.intro[0],
    alternates: {
      canonical: `/${locale}/accessibilite`,
      languages: Object.fromEntries(
        locales.map(l => [l, `/${l}/accessibilite`])
      ),
    },
  }
}

export default async function PageAccessibilite({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale as Locale)

  const d = chargerDeclaration(locale as Locale)
  const t = await getTranslations({ locale: locale as Locale, namespace: "nav" })

  return (
    <article className="section">
      <div className="container">
        {/* La colonne reste étroite : c'est un texte qui se lit, pas une
            grille qui se balaie. */}
        <div className="row">
          <div className="col-lg-8">
            <p className="text-uppercase small fw-semibold mb-2"
               style={{ color: "var(--ald-accent)", letterSpacing: "0.08em" }}>
              {t("accessibility")}
            </p>

            <h1 className="display-6 fw-bold mb-4" style={{ letterSpacing: "-0.02em" }}>
              {d.titre}
            </h1>

            {d.intro.map(paragraphe => (
              <p key={paragraphe.slice(0, 40)} className="mb-3">
                {paragraphe}
              </p>
            ))}

            <h2 className="h4 fw-bold mt-5 mb-3">{d.portee.titre}</h2>
            {d.portee.texte.map(paragraphe => (
              <p key={paragraphe.slice(0, 40)} className="mb-3 text-muted-ald">
                {paragraphe}
              </p>
            ))}

            <h2 className="h4 fw-bold mt-5 mb-2">{d.mesures.titre}</h2>
            <p className="text-muted-ald mb-4">{d.mesures.intro}</p>

            <dl className="mb-0">
              {d.mesures.liste.map(mesure => (
                <div key={mesure.critere} className="mb-4">
                  <dt className="fw-semibold">
                    <span
                      className="small fw-bold me-2"
                      style={{
                        color: "var(--ald-accent)",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {mesure.critere}
                    </span>
                    {mesure.intitule}
                  </dt>
                  <dd className="mb-0 mt-1 text-muted-ald">{mesure.detail}</dd>
                </div>
              ))}
            </dl>

            <h2 className="h4 fw-bold mt-5 mb-3">{d.verification.titre}</h2>
            {d.verification.texte.map(paragraphe => (
              <p key={paragraphe.slice(0, 40)} className="mb-3 text-muted-ald">
                {paragraphe}
              </p>
            ))}

            <h2 className="h4 fw-bold mt-5 mb-2">{d.icones.titre}</h2>
            <p className="text-muted-ald mb-4">{d.icones.intro}</p>
            <dl className="mb-0">
              {d.icones.liste.map(icone => (
                <div key={icone.nom} className="mb-3">
                  <dt className="fw-semibold">{icone.nom}</dt>
                  <dd className="mb-0 mt-1 text-muted-ald">{icone.sens}</dd>
                </div>
              ))}
            </dl>

            <h2 className="h4 fw-bold mt-5 mb-3">{d.limites.titre}</h2>
            <ul className="text-muted-ald">
              {d.limites.liste.map(limite => (
                <li key={limite.slice(0, 40)} className="mb-2">
                  {limite}
                </li>
              ))}
            </ul>

            <h2 className="h4 fw-bold mt-5 mb-3">{d.assistance.titre}</h2>
            <p className="mb-3">{d.assistance.texte}</p>
            <p className="mb-3">
              <a
                href={`mailto:${contact.email}`}
                className="contact-value fw-semibold text-decoration-none"
                style={{ color: "var(--ald-accent)" }}
              >
                {contact.email}
              </a>
              <span className="mx-2 text-muted-ald" aria-hidden="true">
                ·
              </span>
              <a
                href={`tel:${contact.phone}`}
                className="contact-value fw-semibold text-decoration-none"
                style={{ color: "var(--ald-accent)" }}
              >
                {contact.phoneDisplay}
              </a>
            </p>
            <p className="text-muted-ald">{d.assistance.delai}</p>

            <p className="small text-muted-ald mt-5 pt-4"
               style={{ borderTop: "1px solid var(--ald-border)" }}>
              {d.datation}
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
