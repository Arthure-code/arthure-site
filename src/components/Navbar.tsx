"use client"

import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import LocaleSwitcher from "@/components/LocaleSwitcher"
import { contact } from "@/data/site"
import { Link, usePathname } from "@/i18n/navigation"

/**
 * Barre de navigation fixe. Le menu Bootstrap est piloté par l'état React
 * plutôt que par le JavaScript de Bootstrap, ce qui évite d'embarquer
 * son bundle complet pour un simple repli de menu.
 */
export default function Navbar() {
  const t = useTranslations("nav")
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // Referme le menu quand on change de page.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const sections = [
    { href: "#projets", label: t("projects") },
    { href: "#competences", label: t("skills") },
    { href: "#certifications", label: t("certifications") },
    { href: "#contact", label: t("contact") },
  ]

  return (
    <nav className="navbar navbar-expand-md sticky-top navbar-ald">
      <div className="container">
        <Link href="/" className="navbar-brand fw-semibold">
          Arthure Lekoubou Djune
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          aria-expanded={open}
          aria-label={t("toggleMenu")}
          onClick={() => setOpen(o => !o)}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className={`collapse navbar-collapse${open ? " show" : ""}`}>
          <ul className="navbar-nav ms-auto align-items-md-center gap-md-1">
            {sections.map(s => (
              <li key={s.href} className="nav-item">
                <a className="nav-link" href={s.href} onClick={() => setOpen(false)}>
                  {s.label}
                </a>
              </li>
            ))}

            <li className="nav-item">
              <a
                className="nav-link"
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>

            <li className="nav-item ms-md-2">
              <LocaleSwitcher />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
