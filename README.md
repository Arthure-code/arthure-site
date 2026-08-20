# Portfolio — Arthure Lekoubou Djune

Site personnel multilingue, construit avec Next.js et Bootstrap.

## Fonctionnement

Six langues sont proposées : français, anglais, espagnol, portugais, allemand
et italien. La langue est déduite de l'en-tête `Accept-Language` du navigateur
lors de la première visite, puis reste modifiable depuis la barre de navigation.
L'adresse porte toujours le préfixe de langue, par exemple `/fr` ou `/en`.

Les projets ne sont pas écrits dans le code : chaque projet est un fichier JSON
dans `content/projets/`, modifiable par formulaire à l'adresse `/keystatic`.
Le site les lit au moment de la construction, les pages restent donc statiques.

## Développement

```bash
npm install
npm run dev
```

Le site répond sur `http://localhost:3000`, l'administration sur
`http://localhost:3000/keystatic`.

## Administration des projets

Sans réglage particulier, l'administration écrit directement dans les fichiers
du dossier de travail : pratique en local, mais indisponible une fois le site
déployé.

Pour pouvoir modifier les projets en ligne, une application GitHub sert de
passerelle : chaque enregistrement devient un commit, et l'hébergeur reconstruit
le site. Les identifiants correspondants sont fournis par l'assistant de
Keystatic, qui n'est accessible qu'en mode `github` :

```bash
KEYSTATIC_STORAGE=github npm run dev
```

L'assistant écrit alors dans `.env` les variables `KEYSTATIC_GITHUB_CLIENT_ID`,
`KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET` et
`NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`. Ce fichier n'est pas versionné : les
mêmes valeurs, accompagnées de `KEYSTATIC_STORAGE=github`, doivent être
déclarées dans l'hébergeur.

## Structure

| Dossier | Contenu |
| --- | --- |
| `content/projets/` | Un fichier JSON par projet |
| `messages/` | Textes de l'interface, un fichier par langue |
| `src/app/[locale]/` | Pages, préfixées par la langue |
| `src/components/` | Composants d'affichage |
| `src/data/site.ts` | Coordonnées, compétences, certifications |
| `src/i18n/` | Liste des langues et navigation traduite |
| `src/lib/projects.ts` | Lecture des projets à la construction |
| `keystatic.config.ts` | Schéma du formulaire d'administration |
