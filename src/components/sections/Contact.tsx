import { useTranslations } from "next-intl"
import { contact } from "@/data/site"

export default function Contact() {
  const t = useTranslations("contact")

  const items = [
    { label: t("email"), value: contact.email, href: `mailto:${contact.email}` },
    { label: t("github"), value: contact.githubHandle, href: contact.github },
    { label: t("location"), value: t("locationValue"), href: null },
  ]

  return (
    <section id="contact" className="section section--alt">
      <div className="container">
        <h2 className="section-title h1 mb-2">{t("sectionTitle")}</h2>
        <p className="section-lead mb-5">{t("sectionLead")}</p>

        <div className="row g-4">
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
                    className="fw-semibold text-decoration-none"
                    style={{ color: "var(--ald-accent)", wordBreak: "break-word" }}
                  >
                    {item.value}
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
