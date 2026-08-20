/**
 * Page introuvable propre à la branche /keystatic.
 *
 * Elle porte sa propre racine HTML : quand `notFound()` est déclenché depuis
 * le layout voisin, ce layout n'a rien rendu, et le layout racine du site est
 * un simple passe-plat sans <html>. Sans cette page, il ne resterait aucun
 * document valide à renvoyer.
 *
 * L'apparence est volontairement celle d'une page absente ordinaire : rien
 * ne doit laisser deviner qu'une administration existe à cette adresse.
 */
export default function KeystaticNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          fontFamily:
            'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
          <h1
            style={{
              margin: 0,
              paddingRight: "1.25rem",
              borderRight: "1px solid rgba(0, 0, 0, 0.3)",
              fontSize: "1.5rem",
              fontWeight: 500,
            }}
          >
            404
          </h1>
          <p style={{ margin: 0, fontSize: "0.875rem" }}>
            This page could not be found.
          </p>
        </div>
      </body>
    </html>
  )
}
