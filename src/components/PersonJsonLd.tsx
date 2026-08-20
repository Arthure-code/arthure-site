import { contact, siteUrl, skillGroups } from "@/data/site"
import type { CertificationAffichee } from "@/lib/certifications"
import type { Locale } from "@/i18n/routing"

/**
 * Données structurées décrivant la personne, au format JSON-LD.
 *
 * Sans elles, un moteur voit une page de texte et doit deviner qu'elle
 * décrit quelqu'un. Avec elles, il sait qu'il s'agit d'Arthure Lekoubou
 * Djune, développeur à Québec, et peut relier la page aux profils GitHub
 * et LinkedIn ainsi qu'aux certifications vérifiables.
 *
 * C'est ce qui compte pour un portfolio : la requête qui amène un recruteur
 * ici n'est pas « développeur mobile », c'est le nom lu sur un CV.
 */
export default function PersonJsonLd({
  locale,
  role,
  description,
  certifications,
}: {
  locale: Locale
  /** Intitulé du poste, déjà traduit. */
  role: string
  /** Description de la page, déjà traduite. */
  description: string
  certifications: CertificationAffichee[]
}) {
  const donnees = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Arthure Lekoubou Djune",
    url: `${siteUrl}/${locale}`,
    jobTitle: role,
    description,
    email: `mailto:${contact.email}`,
    telephone: contact.phone,

    address: {
      "@type": "PostalAddress",
      addressLocality: "Québec",
      addressRegion: "QC",
      addressCountry: "CA",
    },

    /**
     * Profession rattachée à la Classification nationale des professions.
     *
     * L'intitulé visible dit « full-stack », parce que c'est le mot que
     * tapent les recruteurs. La CNP, elle, ne connaît pas ce terme : son
     * groupe 21234 s'appelle « Développeurs et programmeurs Web ». Les deux
     * coexistent ici, chacun à sa place — le mot courant pour les humains,
     * le code officiel pour les machines qui savent le lire.
     */
    hasOccupation: {
      "@type": "Occupation",
      name: "Développeur Web",
      occupationalCategory: {
        "@type": "CategoryCode",
        codeValue: "21234",
        name: "Développeurs/développeuses et programmeurs/programmeuses Web",
        inCodeSet: {
          "@type": "CategoryCodeSet",
          name: "Classification nationale des professions (CNP) 2021",
          url: "https://noc.esdc.gc.ca/",
        },
      },
      occupationLocation: { "@type": "City", name: "Québec, QC, Canada" },
    },

    // `sameAs` relie cette page aux profils qui désignent la même personne :
    // c'est ce lien qui empêche la confusion avec un homonyme.
    sameAs: [contact.github, contact.linkedin].filter(Boolean),

    // Les technologies écrites une par une, telles qu'elles apparaissent
    // dans la section Compétences : aucune invention, aucun doublon.
    knowsAbout: [
      ...new Set(skillGroups.flatMap(groupe => groupe.items.map(t => t.label))),
    ],

    // Chaque certification pointe vers sa page de vérification officielle,
    // ce qui la rend contrôlable plutôt que déclarative.
    hasCredential: certifications.map(certification => ({
      "@type": "EducationalOccupationalCredential",
      name: certification.nom,
      credentialCategory: "certificate",
      url: certification.lienVerification,
      recognizedBy: { "@type": "Organization", name: certification.emetteur },
    })),
  }

  return (
    <script
      type="application/ld+json"
      // Le JSON est inséré tel quel dans la page ; échapper le chevron
      // ouvrant empêche qu'une valeur contenant « </script> » ne referme
      // la balise prématurément.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(donnees).replace(/</g, "\\u003c"),
      }}
    />
  )
}
