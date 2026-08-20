/**
 * Source unique de vérité pour tout ce qui ne dépend pas de la langue :
 * liens, identifiants, technologies, certifications.
 * Les textes traduisibles vivent dans messages/fr.json et messages/en.json.
 */

/** Base du CDN Devicon : logos officiels des technologies, licence MIT. */
const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons"

/** Construit l'URL d'un logo Devicon. `variant` vaut "original" ou "plain". */
export function techLogo(name: string, variant: "original" | "plain" = "original") {
  return `${DEVICON}/${name}/${name}-${variant}.svg`
}

export interface Tech {
  /** Nom affiché */
  label: string
  /**
   * Identifiant Devicon (dossier du dépôt devicons/devicon).
   * Laisser vide quand la marque n'a pas de logo dans Devicon :
   * la pastille s'affiche alors en texte seul.
   */
  icon?: string
  variant?: "original" | "plain"
  /**
   * URL de logo complète, utilisée quand le logo n'existe pas dans Devicon
   * mais bien dans une autre source officielle (Simple Icons, par exemple).
   */
  iconUrl?: string
}

export const contact = {
  email: "arthure.dev.apps@gmail.com",
  github: "https://github.com/Arthure-code",
  githubHandle: "Arthure-code",
  linkedin: "https://www.linkedin.com/in/arthure-lekoubou-327b45317/",
  /** Nom affiché du profil : l'adresse porte un suffixe généré, illisible. */
  linkedinName: "Arthure Lekoubou Djune",
  /** Format international, seul accepté par les liens `tel:`. */
  phone: "+14185619020",
  /** Découpage lisible, pour l'affichage uniquement. */
  phoneDisplay: "+1 418 561-9020",
} as const

/**
 * Groupes de compétences. `titleKey` est restreint aux sous-clés réellement
 * présentes sous "skills" dans les fichiers de traduction : une faute de
 * frappe est signalée à la compilation.
 */
export type SkillGroupKey = "mobile" | "backend" | "frontend" | "data" | "security" | "devops"

export const skillGroups: Array<{ titleKey: SkillGroupKey; items: Tech[] }> = [
  {
    titleKey: "mobile",
    items: [
      { label: ".NET MAUI", icon: "dotnetcore" },
      { label: "Xamarin", icon: "xamarin" },
      { label: "Android", icon: "android" },
      { label: "Java", icon: "java" },
      { label: "Kotlin", icon: "kotlin" },
    ],
  },
  {
    titleKey: "backend",
    items: [
      { label: "C#", icon: "csharp" },
      { label: "ASP.NET Core", icon: "dotnetcore" },
      { label: "Node.js", icon: "nodejs" },
      { label: "PHP", icon: "php" },
      { label: "Laravel", icon: "laravel" },
    ],
  },
  {
    titleKey: "frontend",
    items: [
      { label: "TypeScript", icon: "typescript" },
      { label: "JavaScript", icon: "javascript" },
      { label: "React", icon: "react" },
      { label: "Vue.js", icon: "vuejs" },
      { label: "Angular", icon: "angular" },
      { label: "Bootstrap", icon: "bootstrap" },
    ],
  },
  {
    titleKey: "data",
    items: [
      { label: "SQL Server", icon: "microsoftsqlserver" },
      { label: "PostgreSQL", icon: "postgresql" },
      { label: "MySQL", icon: "mysql" },
      { label: "MongoDB", icon: "mongodb" },
      { label: "SQLite", icon: "sqlite" },
    ],
  },
  {
    titleKey: "security",
    items: [
      // Simple Icons publie le logo officiel de la fondation OWASP ;
      // Devicon ne le référence pas.
      { label: "OWASP Top 10", iconUrl: "https://cdn.simpleicons.org/owasp" },
      { label: "OWASP ZAP", iconUrl: "https://cdn.simpleicons.org/owasp" },
      { label: "SonarQube / SonarCloud", icon: "sonarqube" },
      // Pas de logo officiel librement redistribuable : texte seul.
      { label: "Microsoft Entra ID" },
    ],
  },
  {
    titleKey: "devops",
    items: [
      { label: "Azure", icon: "azure" },
      { label: "Azure DevOps", icon: "azuredevops" },
      { label: "Git", icon: "git" },
      { label: "GitHub", icon: "github" },
      { label: "Docker", icon: "docker" },
    ],
  },
]

export interface Certification {
  /** Clé de traduction dans messages/*.json, section "certifications" */
  key: "az900" | "dp900" | "sc900" | "postman"
  code: string
  issuer: string
  year: string
  verifyUrl: string
  /**
   * Badge officiel, servi depuis /public.
   * - Microsoft : badge « Certified Fundamentals » téléchargé depuis
   *   learn.microsoft.com, commun aux trois certifications de ce niveau.
   * - Postman : badge extrait du certificat officiel délivré par Postman.
   */
  badge: string
}

export const certifications: Certification[] = [
  {
    key: "az900",
    code: "AZ-900",
    issuer: "Microsoft",
    year: "2025",
    verifyUrl:
      "https://learn.microsoft.com/api/credentials/share/en-us/ArthureLekoubouDjune-8715/D964FAAB05A10DC1?sharingId=8CB681DDB7D6D21B",
    badge: "/certifications/microsoft-fundamentals.svg",
  },
  {
    key: "dp900",
    code: "DP-900",
    issuer: "Microsoft",
    year: "2025",
    verifyUrl:
      "https://learn.microsoft.com/api/credentials/share/en-us/ArthureLekoubouDjune-8715/E4AC4A613D4580CE?sharingId=8CB681DDB7D6D21B",
    badge: "/certifications/microsoft-fundamentals.svg",
  },
  {
    key: "sc900",
    code: "SC-900",
    issuer: "Microsoft",
    year: "2026",
    verifyUrl:
      "https://learn.microsoft.com/api/credentials/share/en-us/ArthureLekoubouDjune-8715/DE0369446386FD76?sharingId=8CB681DDB7D6D21B",
    badge: "/certifications/microsoft-fundamentals.svg",
  },
  {
    key: "postman",
    code: "Postman",
    issuer: "Postman",
    year: "2025",
    verifyUrl: "https://badgr.com/public/assertions/w9MS5SSNRHuzSyO49RwF9Q",
    badge: "/certifications/postman-student-expert.png",
  },
]
