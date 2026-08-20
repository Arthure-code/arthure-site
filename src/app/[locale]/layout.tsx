import { hasLocale, NextIntlClientProvider } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import type { ReactNode } from "react"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { siteUrl } from "@/data/site"
import { locales, routing, type Locale } from "@/i18n/routing"
import { chargerBadges } from "@/lib/badges"
import "../globals.css"

/**
 * Correspondance entre nos codes de langue et les identifiants Open Graph,
 * qui exigent une paire langue_RÉGION.
 */
const OG_LOCALES = {
  fr: "fr_CA",
  en: "en_CA",
  es: "es_ES",
  pt: "pt_BR",
  de: "de_DE",
  it: "it_IT",
} as const

/** Pré-génère une page par langue au build plutôt qu'à la demande. */
export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale: locale as Locale, namespace: "meta" })

  return {
    // Sans cette base, Next resout les adresses relatives ci-dessous
    // contre localhost : les canoniques publiees seraient inutilisables.
    metadataBase: new URL(siteUrl),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      // Une entrée par langue offerte, générée depuis la liste unique
      // de routing.ts : ajouter une langue suffit à mettre à jour le SEO.
      // `x-default` designe la version servie aux visiteurs dont la langue
      // n'est pas offerte, faute de quoi un moteur choisit au hasard.
      languages: {
        ...Object.fromEntries(locales.map(l => [l, `/${l}`])),
        "x-default": `/${routing.defaultLocale}`,
      },
    },
    openGraph: {
      type: "website",
      locale: OG_LOCALES[locale as Locale],
      title: t("title"),
      description: t("description"),
    },
    robots: { index: true, follow: true },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  // Nécessaire pour que le rendu statique connaisse la locale.
  setRequestLocale(locale)

  const t = await getTranslations("nav")

  // Lus au build, comme le reste du contenu administrable.
  const badges = await chargerBadges()

  return (
    <html lang={locale}>
      <body className="d-flex flex-column min-vh-100">
        <NextIntlClientProvider>
          <a className="skip-link" href="#contenu">
            {locale === "fr" ? "Aller au contenu" : "Skip to content"}
          </a>
          <Navbar />
          <main id="contenu" className="flex-grow-1">
            {children}
          </main>
          <Footer badges={badges} />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
