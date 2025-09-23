import type { LucideIcon } from "lucide-react"
import { PlugZap, Route } from "lucide-react"

export type AppNavItem = {
  title: string
  url: string
  icon: LucideIcon
}

export const APP_NAV_ITEMS: AppNavItem[] = [
  {
    title: "Simulateur de trajet",
    url: "/trip-simulator",
    icon: Route,
  },
  {
    title: "Simulateur de charge",
    url: "/charging-simulator",
    icon: PlugZap,
  },
]

export function getNavItemByPath(pathname: string) {
  return APP_NAV_ITEMS.find((item) => pathname.startsWith(item.url))
}
