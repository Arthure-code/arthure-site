import { setRequestLocale } from "next-intl/server"
import type { Locale } from "@/i18n/routing"
import Certifications from "@/components/sections/Certifications"
import Contact from "@/components/sections/Contact"
import Hero from "@/components/sections/Hero"
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

  return (
    <>
      <Hero cv={cv} />
      <Projects projets={projets} />
      <Skills />
      <Certifications certifications={certifications} />
      <Contact />
    </>
  )
}
