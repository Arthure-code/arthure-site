import { getTranslations, setRequestLocale } from "next-intl/server"
import type { Locale } from "@/i18n/routing"
import Certifications from "@/components/sections/Certifications"
import Contact from "@/components/sections/Contact"
import Hero from "@/components/sections/Hero"
import PersonJsonLd from "@/components/PersonJsonLd"
import Projects from "@/components/sections/Projects"
import Skills from "@/components/sections/Skills"
import { chargerCertifications } from "@/lib/certifications"
import { chargerCv } from "@/lib/documents"
import { chargerProjets } from "@/lib/projects"

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale as Locale)

  // Tout est lu au build depuis content/ : la page reste statique.
  const [projets, certifications, cv] = await Promise.all([
    chargerProjets(locale as Locale),
    chargerCertifications(),
    chargerCv(),
  ])

  // Les données structurées reprennent les textes déjà traduits plutôt que
  // d'en introduire de nouveaux : ce que lit un moteur est ce que lit un
  // visiteur, sans divergence possible entre les deux.
  const hero = await getTranslations({ locale: locale as Locale, namespace: "hero" })
  const meta = await getTranslations({ locale: locale as Locale, namespace: "meta" })

  return (
    <>
      <PersonJsonLd
        locale={locale as Locale}
        role={hero("role")}
        description={meta("description")}
        certifications={certifications}
      />

      <Hero cv={cv} />
      <Projects projets={projets} />
      <Skills />
      <Certifications certifications={certifications} />
      <Contact />
    </>
  )
}
