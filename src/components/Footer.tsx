import { useTranslations } from "next-intl"
import Image from "next/image"
import { contact, techLogo } from "@/data/site"

/**
 * Technologies mises en avant dans le pied de page.
 * Les badges de certification ne sont volontairement pas répétés ici :
 * ils vivent dans la section Certifications, plus haut et plus visible.
 */
const FOOTER_TECHS = [
  { label: ".NET", icon: "dotnetcore" },
  { label: "C#", icon: "csharp" },
  { label: "Android", icon: "android" },
  { label: "React", icon: "react" },
  { label: "TypeScript", icon: "typescript" },
  { label: "Azure", icon: "azure" },
  { label: "Docker", icon: "docker" },
  { label: "PostgreSQL", icon: "postgresql" },
]

export default function Footer() {
  const t = useTranslations("footer")
  const year = new Date().getFullYear()

  return (
    <footer
      className="mt-auto pt-4 pb-4"
      style={{ borderTop: "1px solid var(--ald-border)", backgroundColor: "var(--ald-surface-alt)" }}
    >
      <div className="container">
        <div className="d-flex flex-wrap gap-3 align-items-center justify-content-center mb-4">
          {FOOTER_TECHS.map(tech => (
            <Image
              key={tech.label}
              src={techLogo(tech.icon)}
              alt={tech.label}
              title={tech.label}
              width={26}
              height={26}
              unoptimized
              style={{ width: "26px", height: "26px", opacity: 0.85 }}
            />
          ))}
        </div>

        <div
          className="d-flex flex-column flex-sm-row justify-content-between gap-2 pt-3"
          style={{ borderTop: "1px solid var(--ald-border)" }}
        >
          <small className="text-muted-ald">
            © {year} Arthure Lekoubou Djune. {t("rights")}
          </small>
          <small className="text-muted-ald">
            <a
              className="link-secondary text-decoration-none"
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              {contact.githubHandle}
            </a>
            {" · "}
            <a
              className="link-secondary text-decoration-none"
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            {" · "}
            <a className="link-secondary text-decoration-none" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
            {" · "}
            {t("builtWith")}
          </small>
        </div>
      </div>
    </footer>
  )
}
