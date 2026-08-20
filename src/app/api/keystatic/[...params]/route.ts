import { makeRouteHandler } from "@keystatic/next/route-handler"
import config from "../../../../../keystatic.config"

/**
 * Point d'entrée serveur de l'administration : lit et écrit les fichiers
 * en local, ou dialogue avec l'API GitHub une fois en ligne.
 */
export const { POST, GET } = makeRouteHandler({ config })
