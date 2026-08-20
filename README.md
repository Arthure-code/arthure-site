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
NEXT_PUBLIC_KEYSTATIC_STORAGE=github npm run dev
```

L'assistant écrit alors dans `.env` les variables `KEYSTATIC_GITHUB_CLIENT_ID`,
`KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET` et
`NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`. Ce fichier n'est pas versionné : les
mêmes valeurs, accompagnées de `NEXT_PUBLIC_KEYSTATIC_STORAGE=github`, doivent être
déclarées dans l'hébergeur.

## Accès à l'administration

Keystatic empêche déjà toute écriture sans droit de poussée sur le dépôt :
un visiteur sans ce droit se retrouve à travailler sur une copie, et son
enregistrement devient une demande de fusion.

Une seconde barrière est posée en amont, dans `src/app/keystatic/layout.tsx` :
le jeton de la session est présenté à l'API de GitHub, et toute identité
absente de la liste des administrateurs reçoit une page introuvable. La
vérification interroge GitHub plutôt que de lire le témoin, car celui-ci
n'est pas `httpOnly` et reste donc modifiable depuis le navigateur.

La liste par défaut ne contient que le propriétaire du dépôt. Pour l'élargir,
déclarer `KEYSTATIC_ADMINS` avec les comptes séparés par des virgules.

## Fichiers joints

Keystatic range les fichiers d'une fiche dans un sous-dossier portant son
identifiant, et non directement dans le dossier déclaré. Le badge de la
certification `az-900` vit donc dans `public/certifications/az-900/`, et les
captures du projet `lkbconvertor` dans `public/projects/captures/lkbconvertor/`.

Ce détail n'est pas cosmétique : un fichier placé ailleurs s'ouvre comme un
champ vide dans l'administration, alors que le site l'affiche correctement.
Ajouter une fiche par le formulaire respecte la convention d'office ; seuls
les fichiers déposés à la main demandent cette attention.

Les singletons n'ont pas d'identifiant, leurs fichiers restent donc à la
racine du dossier déclaré — `public/cv/` pour le curriculum vitae.

## Structure

| Dossier | Contenu |
| --- | --- |
| `content/projets/` | Un fichier JSON par projet |
| `messages/` | Textes de l'interface, un fichier par langue |
| `src/app/[locale]/` | Pages, préfixées par la langue |
| `src/components/` | Composants d'affichage |
| `content/certifications/` | Une fiche JSON par certification |
| `content/documents.json` | Curriculum vitae proposé au téléchargement |
| `src/data/site.ts` | Coordonnées et compétences |
| `src/i18n/` | Liste des langues et navigation traduite |
| `src/lib/projects.ts` | Lecture des projets à la construction |
| `keystatic.config.ts` | Schéma du formulaire d'administration |
