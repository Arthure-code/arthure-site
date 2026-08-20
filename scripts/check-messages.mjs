#!/usr/bin/env node
/**
 * Vérifie que toutes les langues déclarent exactement les mêmes clés
 * que la langue de référence (le français).
 *
 * Le typage TypeScript valide les clés *utilisées* dans le code, mais il
 * ne peut pas savoir qu'une traduction espagnole a oublié une entrée :
 * le fichier serait simplement incomplet à l'exécution. Ce contrôle comble
 * ce trou et fait échouer le build avant la mise en ligne.
 *
 * Lancé automatiquement avant `next build` (voir le script "prebuild").
 */

import { readdirSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const MESSAGES_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "messages")
const REFERENCE = "fr"

/** Aplatit un objet imbriqué en chemins « a.b.c ». */
function flatten(obj, prefix = "") {
  const keys = []
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key
    if (value && typeof value === "object" && !Array.isArray(value)) {
      keys.push(...flatten(value, path))
    } else {
      keys.push(path)
    }
  }
  return keys
}

function load(locale) {
  return JSON.parse(readFileSync(join(MESSAGES_DIR, `${locale}.json`), "utf8"))
}

const locales = readdirSync(MESSAGES_DIR)
  .filter(f => f.endsWith(".json"))
  .map(f => f.replace(/\.json$/, ""))

if (!locales.includes(REFERENCE)) {
  console.error(`✖ Langue de référence manquante : messages/${REFERENCE}.json`)
  process.exit(1)
}

const reference = new Set(flatten(load(REFERENCE)))
let failed = false

for (const locale of locales.filter(l => l !== REFERENCE)) {
  const keys = new Set(flatten(load(locale)))

  const missing = [...reference].filter(k => !keys.has(k))
  const extra = [...keys].filter(k => !reference.has(k))

  if (missing.length || extra.length) {
    failed = true
    console.error(`\n✖ messages/${locale}.json`)
    for (const k of missing) console.error(`    manquant : ${k}`)
    for (const k of extra) console.error(`    en trop  : ${k}`)
  }
}

if (failed) {
  console.error(
    `\nLes traductions ne correspondent pas à messages/${REFERENCE}.json. Build interrompu.\n`
  )
  process.exit(1)
}

console.log(
  `✓ ${locales.length} langues cohérentes (${reference.size} clés) : ${locales.join(", ")}`
)
