import { setRequestLocale } from "next-intl/server"
import type { Locale } from "@/i18n/routing"
import Certifications from "@/components/sections/Certifications"
import Contact from "@/components/sections/Contact"
import Hero from "@/components/sections/Hero"
import Projects from "@/components/sections/Projects"
import Skills from "@/components/sections/Skills"
import { chargerProjets } from "@/lib/projects"

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale as Locale)

  // Lus au build depuis content/projets : la page reste statique.
  const projets = await chargerProjets(locale as Locale)

  return (
    <>
      <Hero />
      <Projects projets={projets} />
      <Skills />
      <Certifications />
      <Contact />
    </>
  )
}
