"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function TerminalNav() {
  const pathname = usePathname()
  
  const links = [
    { href: "/", label: "home" },
    { href: "/about", label: "about" },
    { href: "/projects", label: "projects" },
    { href: "/writings", label: "writings" },
  ]

  return (
    <nav className="mb-6">
      <div className="text-muted-foreground mb-2">
        Microsoft Windows [Version 10.0.19045.3803]
      </div>
      <div className="text-muted-foreground mb-4">
        (c) Microsoft Corporation. All rights reserved.
      </div>
      <div className="flex flex-wrap items-center gap-x-1">
        <span className="text-foreground">C:\Users\Ku6epXBOCTuK{">"}</span>
        <span className="text-foreground">dir /b</span>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 ml-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`hover:underline transition-colors ${
              pathname === link.href
                ? "text-[oklch(0.85_0.25_250)] underline"
                : "text-[oklch(0.7_0.2_250)]"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
