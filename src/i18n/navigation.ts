import { createNavigation } from "next-intl/navigation"
import { routing } from "./routing"

/**
 * Versions de Link / useRouter / redirect conscientes de la langue courante.
 * On les importe à la place de celles de next/link et next/navigation :
 * le préfixe de langue est alors ajouté automatiquement.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing)
