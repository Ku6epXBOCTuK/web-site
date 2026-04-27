import Link from "next/link"

export function TerminalFooter() {
  const links = [
    { href: "https://github.com/Ku6epXBOCTuK", label: "github" },
    { href: "https://t.me/ku6epxboctuk", label: "telegram" },
    { href: "https://twitch.tv/ku6epxboctuk", label: "twitch" },
    { href: "https://ku6epxboctuk.is-a.dev", label: "site" },
    { href: "mailto:ku6epxboctuk@proton.me", label: "email" },
  ]

  return (
    <footer className="mt-12 pt-6 border-t border-border">
      <div className="text-muted-foreground text-sm">
        built with vscode and couple cups of tea
      </div>
      <div className="flex flex-wrap gap-x-2 gap-y-1 mt-2">
        {links.map((link, index) => (
          <span key={link.href} className="flex items-center gap-2">
            <Link
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[oklch(0.7_0.2_250)] hover:text-[oklch(0.85_0.25_250)] hover:underline underline-offset-2"
            >
              {link.label}
            </Link>
            {index < links.length - 1 && <span className="text-muted-foreground">|</span>}
          </span>
        ))}
      </div>
    </footer>
  )
}
