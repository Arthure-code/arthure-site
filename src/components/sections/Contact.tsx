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
        <h2 className="section-title h1 mb-2">{t("sectionTitle")}</h2>
        <p className="section-lead mb-5">{t("sectionLead")}</p>

        {/* Cinq cartes dans une grille de trois : la dernière rangée est
            incomplète, on la centre pour qu'elle paraisse voulue plutôt
            que tronquée. */}
        <div className="row g-4 justify-content-center">
          {items.map(item => (
            <div key={item.label} className="col-md-4">
              <div className="ald-card h-100 p-4">
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
                        : "fw-semibold text-decoration-none"
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
                  <p className="fw-semibold mb-0">{item.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
