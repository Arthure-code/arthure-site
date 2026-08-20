import type { ReactNode } from "react"
import "./globals.css"

/**
 * Layout racine minimal : la vraie structure HTML (avec la bonne langue)
 * est définie dans src/app/[locale]/layout.tsx, qui connaît la locale.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children
}
