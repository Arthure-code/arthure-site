import { useTranslations } from "next-intl"
import Image from "next/image"
import { contact, techLogo } from "@/data/site"

interface Item {
  label: string
  value: string
  href: string | null
  /**
   * Logo officiel de la plateforme, quand elle en a un.
   * Il remplace alors le texte : la marque se reconnaît plus vite qu'un
   * identifiant, et le nom du compte n'apporte rien de plus que le lien.
   * Le texte reste porté par `value`, qui sert de libellé d'accessibilité.
   */
  logo?: string
}

export default function Contact() {
  const t = useTranslations("contact")

  const items: Item[] = [
    { label: t("email"), value: contact.email, href: `mailto:${contact.email}` },
    { label: t("phone"), value: contact.phoneDisplay, href: `tel:${contact.phone}` },
    {
      label: t("linkedin"),
      value: contact.linkedinName,
      href: contact.linkedin,
      logo: techLogo("linkedin"),
    },
    {
      label: t("github"),
      value: contact.githubHandle,
      href: contact.github,
      logo: techLogo("github"),
    },
    { label: t("location"), value: t("locationValue"), href: null },
  ]

  return (
    <section id="contact" className="section section--alt">
      <div className="container">
        {/* Sans phrase d'introduction, le titre porte seul l'espacement
            qui precede la rangee de coordonnees. */}
        <h2 className="section-title h1 mb-5">{t("sectionTitle")}</h2>

        {/* Une seule rangée sur grand écran, sans encadré : les cinq entrées
            sont courtes et se lisent d'un coup d'oeil, des cartes leur
            donneraient un poids qu'elles n'ont pas. Elles se replient en
            deux puis trois colonnes sur les écrans plus étroits, et une
            seule sur téléphone : en dessous, l'adresse courriel se couperait
            au milieu du domaine, faute de point de césure. */}
        <div className="row g-4 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5">
          {items.map(item => (
            <div key={item.label} className="col">
              <div>
                <p className="small text-uppercase fw-semibold text-muted-ald mb-2">
                  {item.label}
                </p>

                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className={
                      item.logo
                        ? "contact-logo d-inline-flex"
                        : "contact-value fw-semibold text-decoration-none"
                    }
                    style={item.logo ? undefined : { color: "var(--ald-accent)", wordBreak: "break-word" }}
                    // Sans texte visible, le lien a besoin d'un nom accessible.
                    aria-label={item.logo ? `${item.label} — ${item.value}` : undefined}
                  >
                    {item.logo ? (
                      <Image
                        src={item.logo}
                        alt=""
                        width={32}
                        height={32}
                        unoptimized
                        aria-hidden="true"
                      />
                    ) : (
                      item.value
                    )}
                  </a>
                ) : (
                  <p className="contact-value fw-semibold mb-0">{item.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
