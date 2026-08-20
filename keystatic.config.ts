import { collection, config, fields } from "@keystatic/core"

/**
 * Configuration de l'interface d'administration, accessible à /keystatic.
 *
 * Les projets sont enregistrés comme fichiers JSON dans le dépôt, et non
 * dans une base de données : aucun serveur à héberger, aucun coût, et
 * l'historique des modifications est celui de Git.
 *
 * En local, l'interface écrit directement dans les fichiers.
 * En ligne, elle passe par l'API GitHub et produit un commit, ce qui
 * déclenche une reconstruction automatique du site sur Vercel.
 */

/** Liste fermée des technologies proposées, avec leur logo Devicon. */
const TECH_OPTIONS = [
  { label: ".NET MAUI", value: "dotnetcore" },
  { label: "C#", value: "csharp" },
  { label: "Android", value: "android" },
  { label: "Kotlin", value: "kotlin" },
  { label: "Java", value: "java" },
  { label: "Xamarin", value: "xamarin" },
  { label: "TypeScript", value: "typescript" },
  { label: "JavaScript", value: "javascript" },
  { label: "React", value: "react" },
  { label: "Vue.js", value: "vuejs" },
  { label: "Angular", value: "angular" },
  { label: "Node.js", value: "nodejs" },
  { label: "PHP", value: "php" },
  { label: "Laravel", value: "laravel" },
  { label: "Bootstrap", value: "bootstrap" },
  { label: "Next.js", value: "nextjs" },
  { label: "PostgreSQL", value: "postgresql" },
  { label: "SQL Server", value: "microsoftsqlserver" },
  { label: "MySQL", value: "mysql" },
  { label: "MongoDB", value: "mongodb" },
  { label: "SQLite", value: "sqlite" },
  { label: "Docker", value: "docker" },
  { label: "Azure", value: "azure" },
  { label: "Azure DevOps", value: "azuredevops" },
  { label: "Git", value: "git" },
  { label: "GitHub", value: "github" },
  { label: "SonarQube", value: "sonarqube" },
  { label: "Linux", value: "linux" },
  { label: "Kubernetes", value: "kubernetes" },
]

export default config({
  /**
   * Le mode est choisi par une variable explicite, et non par l'environnement
   * ni par la présence des identifiants.
   *
   * La raison est concrète : l'assistant qui crée l'application GitHub n'est
   * accessible qu'en mode « github ». Si le mode dépendait des identifiants,
   * il faudrait déjà les posséder pour atteindre l'assistant qui les fabrique.
   *
   * Sans la variable, l'administration écrit dans les fichiers locaux et le
   * build aboutit toujours, ce qui garde le projet clonable sans réglage.
   */
  storage:
    process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE === "github"
      ? {
          kind: "github",
          repo: { owner: "Arthure-code", name: "arthure-site" },
        }
      : { kind: "local" },

  ui: {
    brand: { name: "Portfolio — Arthure Lekoubou Djune" },
  },

  collections: {
    projects: collection({
      label: "Projets",
      slugField: "titre",
      path: "content/projets/*",
      format: { data: "json" },

      // Colonnes affichées dans la liste des projets.
      columns: ["titre", "annee"],

      schema: {
        titre: fields.slug({
          name: {
            label: "Nom du projet",
            description: "Affiché tel quel, dans toutes les langues.",
            validation: { isRequired: true },
          },
        }),

        annee: fields.text({
          label: "Période",
          description: "Par exemple : 2026, ou 2025 – 2026.",
        }),

        ordre: fields.integer({
          label: "Ordre d'affichage",
          description: "Les plus petits nombres apparaissent en premier.",
          defaultValue: 100,
        }),

        publie: fields.checkbox({
          label: "Afficher sur le site",
          defaultValue: true,
        }),

        // ---------- Textes traduisibles ----------
        fr: fields.object(
          {
            accroche: fields.text({
              label: "Accroche",
              description: "Une ligne, sous le nom du projet.",
              validation: { isRequired: true },
            }),
            description: fields.text({
              label: "Description",
              multiline: true,
              validation: { isRequired: true },
            }),
            points: fields.array(fields.text({ label: "Point" }), {
              label: "Points marquants",
              itemLabel: props => props.value || "Point",
            }),
            note: fields.text({
              label: "Note (facultative)",
              description: "Précision ou limite à signaler honnêtement.",
              multiline: true,
            }),
          },
          { label: "Français" }
        ),

        en: fields.object(
          {
            accroche: fields.text({ label: "Tagline" }),
            description: fields.text({ label: "Description", multiline: true }),
            points: fields.array(fields.text({ label: "Highlight" }), {
              label: "Highlights",
              itemLabel: props => props.value || "Highlight",
            }),
            note: fields.text({ label: "Note (optional)", multiline: true }),
          },
          { label: "English" }
        ),

        // ---------- Liens et qualité ----------
        depot: fields.url({
          label: "Dépôt GitHub",
          description: "Adresse complète du dépôt.",
        }),

        sonarProject: fields.text({
          label: "Identifiant SonarCloud",
          description:
            "Par exemple Arthure-code_LKBConvertor. Laisser vide si le projet n'est pas analysé : les badges disparaissent alors.",
        }),

        // ---------- Technologies ----------
        technologies: fields.array(
          fields.object({
            nom: fields.text({
              label: "Nom affiché",
              description: "Par exemple .NET 9 MAUI.",
            }),
            logo: fields.select({
              label: "Logo",
              options: TECH_OPTIONS,
              defaultValue: "csharp",
            }),
          }),
          {
            label: "Technologies",
            itemLabel: props => props.fields.nom.value || "Technologie",
          }
        ),

        // ---------- Captures ----------
        captures: fields.array(
          fields.object({
            image: fields.image({
              label: "Capture",
              directory: "public/projects/captures",
              publicPath: "/projects/captures/",
              validation: { isRequired: true },
            }),
            legendeFr: fields.text({ label: "Légende (français)" }),
            legendeEn: fields.text({ label: "Caption (English)" }),
          }),
          {
            label: "Captures d'écran",
            description:
              "La première sert de vignette principale. Glisser-déposer pour réordonner.",
            itemLabel: props => props.fields.legendeFr.value || "Capture",
          }
        ),
      },
    }),
  },
})
