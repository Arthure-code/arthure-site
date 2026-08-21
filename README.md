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

## Référencement

Le plan du site et les directives d'exploration sont générés par Next.js
(`src/app/sitemap.ts` et `src/app/robots.ts`). Les six versions
linguistiques y sont déclarées avec leurs correspondances `hreflang`, plus
un `x-default` qui désigne la version servie aux visiteurs dont la langue
n'est pas offerte.

Chaque page porte des données structurées `Person` construites depuis les
données réelles du site : coordonnées, technologies de la section
Compétences, certifications avec leur lien de vérification. Rien n'y est
saisi en double, donc rien ne peut diverger de ce que lit un visiteur.

Toutes ces adresses sont absolues et dérivent de `siteUrl`, dans
`src/data/site.ts`. Passer à un nom de domaine personnel se fait en
déclarant `NEXT_PUBLIC_SITE_URL` chez l'hébergeur, sans toucher au code.

## Accessibilité

Le site vise le **SGQRI 008 3.0**, standard québécois en vigueur depuis le
29 avril 2024. Il est plus exigeant que la norme fédérale
**CAN/ASC-EN 301 549:2024** : là où celle-ci demande WCAG 2.1 niveau AA, le
standard québécois y ajoute sept critères de WCAG 2.2, dont la taille de
cible minimale (2.5.8), le focus non masqué (2.4.11) et l'apparence du
focus (2.4.13).

Ni l'un ni l'autre ne s'impose légalement à un site personnel — ils visent
les organismes publics et les entités sous réglementation fédérale. Le site
s'y conforme quand même : c'est vérifiable, et la plupart des clients
publics du Québec l'exigent de leurs fournisseurs.

Points mesurés plutôt que supposés :

| Critère | Mesure |
| --- | --- |
| 1.4.3 Contraste minimal | accent 5,84 sur blanc, 5,48 sur gris ; 6,79 en mode sombre |
| 1.4.10 Redimensionnement | aucun défilement horizontal à 320 px |
| 1.4.12 Espacement du texte | tient les surcharges imposées par le critère |
| 2.4.11 Focus non masqué | `scroll-padding-top` compense la barre fixe |
| 2.4.13 Apparence du focus | contour de 3 px, décalé de 2 px |
| 2.5.8 Taille de cible | 24 px minimum hors liens en ligne |
| 2.3.3 Animation | défilement fluide désactivé sous `prefers-reduced-motion` |

## Structure

| Dossier | Contenu |
| --- | --- |
| `content/projets/` | Un fichier JSON par projet |
| `content/certifications/` | Une fiche JSON par certification |
| `content/badges/` | Une fiche JSON par badge d'apprentissage |
| `content/documents.json` | Curriculum vitae proposé au téléchargement |
| `messages/` | Textes de l'interface, un fichier par langue |
| `src/app/[locale]/` | Pages, préfixées par la langue |
| `src/components/` | Composants d'affichage |
| `src/data/site.ts` | Coordonnées et compétences |
| `src/i18n/` | Liste des langues et navigation traduite |
| `src/lib/` | Lecture de `content/` à la construction |
| `keystatic.config.ts` | Schéma du formulaire d'administration |
