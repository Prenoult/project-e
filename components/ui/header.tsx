"use client"

import { usePathname } from "next/navigation"
import { getNavItemByPath } from "@/data/navigation"

export default function Header() {
  const pathname = usePathname()
  const currentItem = getNavItemByPath(pathname)

  return (
    <h1 className="text-base font-medium">
      {currentItem?.title ?? "Project-E"}
    </h1>
  )
}
