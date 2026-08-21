import type { Locale } from "@/i18n/routing"

/**
 * Contenu de la déclaration d'accessibilité.
 *
 * Le SGQRI 008 3.0 impose qu'une telle page existe, qu'elle nomme les
 * mesures prises, les technologies d'assistance ayant servi à vérifier la
 * conformité, la signification des icônes employées, et qu'elle offre une
 * assistance. Ce fichier n'est pas administrable depuis /keystatic : son
 * contenu engage, il n'a pas à changer au fil des humeurs.
 *
 * Rédigé en français et en anglais, comme le contenu des projets. Les
 * autres langues reçoivent la version anglaise.
 */

export interface Mesure {
  critere: string
  intitule: string
  detail: string
}

export interface DeclarationAccessibilite {
  titre: string
  intro: string[]
  portee: { titre: string; texte: string[] }
  mesures: { titre: string; intro: string; liste: Mesure[] }
  verification: { titre: string; texte: string[] }
  icones: { titre: string; intro: string; liste: Array<{ nom: string; sens: string }> }
  limites: { titre: string; liste: string[] }
  assistance: { titre: string; texte: string; delai: string }
  datation: string
}

const FR: DeclarationAccessibilite = {
  titre: "Déclaration d'accessibilité",

  intro: [
    "Ce site vise la conformité au Standard sur l'accessibilité des sites Web (SGQRI 008 3.0), en vigueur au Québec depuis le 29 avril 2024. Ce standard exige la conformité à WCAG 2.1 niveau AA, augmentée de sept critères tirés de WCAG 2.2.",
    "Aucune obligation légale ne s'applique à un site personnel : le standard vise les organismes publics, et la norme fédérale CAN/ASC-EN 301 549:2024 les entités sous réglementation fédérale. La conformité est ici volontaire, et vérifiable.",
  ],

  portee: {
    titre: "Portée",
    texte: [
      "La déclaration couvre l'ensemble des pages publiques du site, dans les six langues offertes.",
      "L'interface d'administration, à l'adresse /keystatic, n'est pas couverte : elle n'est accessible qu'au propriétaire du site et repose sur un logiciel tiers dont je ne contrôle pas le rendu.",
    ],
  },

  mesures: {
    titre: "Mesures prises",
    intro: "Chaque valeur ci-dessous a été mesurée sur le site déployé, non estimée.",
    liste: [
      {
        critere: "1.4.3",
        intitule: "Contraste minimal",
        detail: "La couleur d'accent tient 5,84 sur fond blanc et 5,48 sur le gris des sections alternées, contre les 4,5 exigés. En thème sombre, 6,79. Le bleu employé auparavant tombait à 4,23 sur ce gris.",
      },
      {
        critere: "1.4.10",
        intitule: "Redimensionnement du contenu",
        detail: "Aucun défilement horizontal à 320 pixels de large, soit l'équivalent d'un agrandissement à 400 % sur un écran de bureau.",
      },
      {
        critere: "1.4.12",
        intitule: "Espacement du texte",
        detail: "La mise en page reste intacte lorsque l'interligne, l'espacement des lettres et celui des mots sont forcés aux valeurs imposées par le critère.",
      },
      {
        critere: "2.3.3",
        intitule: "Animation à l'interaction",
        detail: "Le défilement fluide et les transitions au survol sont désactivés lorsque le système déclare préférer un mouvement réduit.",
      },
      {
        critere: "2.4.11",
        intitule: "Focus non masqué",
        detail: "La barre de navigation reste fixe en haut de l'écran ; un décalage de défilement l'empêche de recouvrir l'élément qui reçoit le focus.",
      },
      {
        critere: "2.4.13",
        intitule: "Apparence du focus",
        detail: "Contour continu de 3 pixels, décalé de 2 pixels de l'élément. Il remplace l'ombre portée de Bootstrap, peu visible sur fond clair.",
      },
      {
        critere: "2.5.8",
        intitule: "Taille de cible minimale",
        detail: "Les liens autonomes mesurent au moins 24 pixels de haut. Les liens inclus dans une phrase relèvent de l'exception prévue par le critère.",
      },
      {
        critere: "3.1.1 / 3.1.2",
        intitule: "Langue de la page",
        detail: "L'attribut de langue est déclaré sur chaque page et suit la langue affichée. Les six versions se déclarent mutuellement par des liens hreflang.",
      },
    ],
  },

  verification: {
    titre: "Méthode de vérification",
    texte: [
      "Les contrastes ont été calculés à partir des couleurs réellement appliquées dans le navigateur, selon la formule de luminance relative de WCAG. Le parcours au clavier a été effectué touche par touche, en observant l'élément qui reçoit le focus. Le redimensionnement et l'espacement du texte ont été éprouvés en modifiant la fenêtre et en injectant les surcharges prévues par les critères.",
      "Aucun lecteur d'écran n'a été employé. Ni NVDA, ni JAWS, ni VoiceOver, ni TalkBack. Le standard demande de nommer les technologies d'assistance ayant servi à la vérification : dans le cas présent, il n'y en a aucune, et il faut le dire plutôt que de laisser croire le contraire. Une vérification automatisée et clavier ne remplace pas l'écoute réelle d'une page.",
    ],
  },

  icones: {
    titre: "Signification des icônes",
    intro: "Le standard demande de décrire chaque icône employée. Toutes sont décoratives et doublées d'un texte : aucune ne porte seule une information.",
    liste: [
      { nom: "Logos de technologies", sens: "Illustrent le nom de la technologie écrit juste à côté. Servis par le dépôt public Devicon." },
      { nom: "Logo GitHub", sens: "Lien vers mon dépôt de code. Le libellé accessible du lien énonce la plateforme et l'identifiant." },
      { nom: "Logo LinkedIn", sens: "Lien vers mon profil professionnel. Même traitement." },
      { nom: "Badges de certification", sens: "Image officielle du certificateur. Le code, l'intitulé, l'émetteur et l'année sont écrits sous l'image." },
      { nom: "Badges SonarCloud", sens: "État de l'analyse de qualité d'un projet. Chaque badge porte un texte de remplacement qui nomme la métrique." },
      { nom: "Flèches de la visionneuse", sens: "Image précédente et image suivante. Les touches fléchées font la même chose." },
      { nom: "Croix de fermeture", sens: "Ferme la visionneuse. La touche Échap fait la même chose." },
      { nom: "Chevron du sélecteur de langue", sens: "Signale un menu déroulant." },
    ],
  },

  limites: {
    titre: "Limites connues",
    liste: [
      "La description des projets n'existe qu'en français et en anglais. Les visiteurs des quatre autres langues reçoivent la version anglaise, l'interface restant dans leur langue.",
      "Les badges de qualité proviennent de SonarCloud et les logos de technologies de Devicon. Leur contenu est produit par ces services ; je n'en contrôle que le texte de remplacement.",
      "Les captures d'écran des projets sont décrites par une légende, pas par une description longue de ce que montre chaque écran.",
    ],
  },

  assistance: {
    titre: "Obtenir de l'assistance",
    texte: "Si une partie de ce site vous est inaccessible, écrivez-moi ou téléphonez-moi. Je fournirai l'information demandée sous une autre forme, et je corrigerai le problème.",
    delai: "Je réponds sous deux jours ouvrables.",
  },

  datation: "Déclaration établie le 21 août 2026, à partir de mesures effectuées sur la version déployée ce jour-là.",
}

const EN: DeclarationAccessibilite = {
  titre: "Accessibility statement",

  intro: [
    "This site aims to conform to the Standard sur l'accessibilité des sites Web (SGQRI 008 3.0), in force in Quebec since 29 April 2024. It requires WCAG 2.1 Level AA, plus seven criteria drawn from WCAG 2.2.",
    "No legal obligation applies to a personal site: the standard covers public bodies, and the federal CAN/ASC-EN 301 549:2024 covers federally regulated entities. Conformance here is voluntary, and verifiable.",
  ],

  portee: {
    titre: "Scope",
    texte: [
      "This statement covers every public page of the site, in all six languages offered.",
      "The administration interface at /keystatic is not covered: only the site owner can reach it, and it relies on third-party software whose rendering I do not control.",
    ],
  },

  mesures: {
    titre: "Measures taken",
    intro: "Every figure below was measured on the deployed site, not estimated.",
    liste: [
      {
        critere: "1.4.3",
        intitule: "Contrast (minimum)",
        detail: "The accent colour holds 5.84 on white and 5.48 on the grey of alternating sections, against the 4.5 required. In dark theme, 6.79. The blue used previously fell to 4.23 on that grey.",
      },
      {
        critere: "1.4.10",
        intitule: "Reflow",
        detail: "No horizontal scrolling at 320 pixels wide, the equivalent of 400% zoom on a desktop screen.",
      },
      {
        critere: "1.4.12",
        intitule: "Text spacing",
        detail: "The layout survives line height, letter spacing and word spacing forced to the values the criterion imposes.",
      },
      {
        critere: "2.3.3",
        intitule: "Animation from interactions",
        detail: "Smooth scrolling and hover transitions are disabled when the system declares a preference for reduced motion.",
      },
      {
        critere: "2.4.11",
        intitule: "Focus not obscured",
        detail: "The navigation bar stays fixed at the top; a scroll offset keeps it from covering whichever element receives focus.",
      },
      {
        critere: "2.4.13",
        intitule: "Focus appearance",
        detail: "A solid 3-pixel outline, offset by 2 pixels. It replaces Bootstrap's drop shadow, which reads poorly on light backgrounds.",
      },
      {
        critere: "2.5.8",
        intitule: "Target size (minimum)",
        detail: "Standalone links are at least 24 pixels tall. Links inside a sentence fall under the exception the criterion allows.",
      },
      {
        critere: "3.1.1 / 3.1.2",
        intitule: "Language of page",
        detail: "The language attribute is declared on every page and follows the language displayed. The six versions declare one another through hreflang links.",
      },
    ],
  },

  verification: {
    titre: "How this was verified",
    texte: [
      "Contrast was computed from the colours actually applied in the browser, using the WCAG relative luminance formula. Keyboard navigation was walked key by key, observing which element received focus. Reflow and text spacing were tested by resizing the window and injecting the overrides the criteria prescribe.",
      "No screen reader was used. Not NVDA, not JAWS, not VoiceOver, not TalkBack. The standard asks that assistive technologies used for verification be named: here there are none, and saying so is better than implying otherwise. Automated and keyboard checks are not a substitute for actually listening to a page.",
    ],
  },

  icones: {
    titre: "What the icons mean",
    intro: "The standard asks that each icon be described. All are decorative and paired with text: none carries information on its own.",
    liste: [
      { nom: "Technology logos", sens: "Illustrate the technology named beside them. Served from the public Devicon repository." },
      { nom: "GitHub logo", sens: "Link to my code repositories. The link's accessible name states the platform and the handle." },
      { nom: "LinkedIn logo", sens: "Link to my professional profile. Same treatment." },
      { nom: "Certification badges", sens: "The certifier's official image. Code, title, issuer and year are written below it." },
      { nom: "SonarCloud badges", sens: "Quality-analysis status for a project. Each badge carries alternative text naming the metric." },
      { nom: "Viewer arrows", sens: "Previous and next image. The arrow keys do the same." },
      { nom: "Close cross", sens: "Closes the viewer. The Escape key does the same." },
      { nom: "Language selector chevron", sens: "Indicates a dropdown menu." },
    ],
  },

  limites: {
    titre: "Known limitations",
    liste: [
      "Project descriptions exist in French and English only. Visitors in the other four languages receive the English version, while the interface stays in their language.",
      "Quality badges come from SonarCloud and technology logos from Devicon. Those services produce the content; I control only the alternative text.",
      "Project screenshots carry a caption, not a long description of what each screen shows.",
    ],
  },

  assistance: {
    titre: "Getting help",
    texte: "If any part of this site is not accessible to you, email or call me. I will provide the information in another form, and fix the problem.",
    delai: "I reply within two business days.",
  },

  datation: "Statement prepared on 21 August 2026, from measurements taken on the version deployed that day.",
}

export function chargerDeclaration(locale: Locale): DeclarationAccessibilite {
  return locale === "fr" ? FR : EN
}
