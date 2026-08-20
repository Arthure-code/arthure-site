"use client"

import { useLocale, useTranslations } from "next-intl"
import { useEffect, useRef, useState } from "react"
import { Link, usePathname } from "@/i18n/navigation"
import { localeNames, localeShort, locales, type Locale } from "@/i18n/routing"

/**
 * Menu de choix de la langue.
 * Le choix est mémorisé par next-intl dans un témoin (NEXT_LOCALE)
 * et prime ensuite sur la détection automatique du navigateur.
 */
export default function LocaleSwitcher() {
  const t = useTranslations("nav")
  const current = useLocale() as Locale
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Ferme le menu au clic à l'extérieur ou à la touche Échap.
  useEffect(() => {
    if (!open) return

    function onPointerDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)
    }

    document.addEventListener("mousedown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("mousedown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [open])

  return (
    <div className="dropdown" ref={ref}>
      <button
        type="button"
        className="btn btn-sm btn-outline-secondary dropdown-toggle"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={t("language")}
        onClick={() => setOpen(o => !o)}
      >
        {localeShort[current]}
      </button>

      <ul
        className={`dropdown-menu dropdown-menu-end${open ? " show" : ""}`}
        role="listbox"
        style={{ minWidth: "10rem" }}
      >
        {locales.map(locale => (
          <li key={locale}>
            <Link
              href={pathname}
              locale={locale}
              hrefLang={locale}
              lang={locale}
              role="option"
              aria-selected={locale === current}
              className={`dropdown-item d-flex justify-content-between align-items-center${
                locale === current ? " active" : ""
              }`}
              onClick={() => setOpen(false)}
            >
              <span>{localeNames[locale]}</span>
              <span className="small text-muted-ald">{localeShort[locale]}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
