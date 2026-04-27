import Link from "next/link"

export function TerminalHome() {
  const asciiArt = `
██╗  ██╗██╗   ██╗ ██████╗ ███████╗██████╗ ██╗  ██╗██████╗  ██████╗  ██████╗████████╗██╗   ██╗██╗  ██╗
██║ ██╔╝██║   ██║██╔════╝ ██╔════╝██╔══██╗╚██╗██╔╝██╔══██╗██╔═══██╗██╔════╝╚══██╔══╝██║   ██║██║ ██╔╝
█████╔╝ ██║   ██║███████╗ █████╗  ██████╔╝ ╚███╔╝ ██████╔╝██║   ██║██║        ██║   ██║   ██║█████╔╝ 
██╔═██╗ ██║   ██║██╔═══██╗██╔══╝  ██╔═══╝  ██╔██╗ ██╔══██╗██║   ██║██║        ██║   ██║   ██║██╔═██╗ 
██║  ██╗╚██████╔╝╚██████╔╝███████╗██║     ██╔╝ ██╗██████╔╝╚██████╔╝╚██████╗   ██║   ╚██████╔╝██║  ██╗
╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚══════╝╚═╝     ╚═╝  ╚═╝╚═════╝  ╚═════╝  ╚═════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝`

  const links = [
    { href: "https://github.com/Ku6epXBOCTuK", label: "github", desc: "where the code lives" },
    { href: "https://t.me/ku6epxboctuk", label: "telegram", desc: "short thoughts & threads" },
    { href: "https://twitch.tv/ku6epxboctuk", label: "twitch", desc: "coding streams" },
    { href: "mailto:ku6epxboctuk@proton.me", label: "email", desc: "reach out" },
  ]

  return (
    <main className="space-y-6">
      {/* ASCII Art */}
      <pre className="text-foreground text-[0.35rem] sm:text-[0.5rem] md:text-xs leading-none overflow-x-auto whitespace-pre">
        {asciiArt}
      </pre>

      {/* Whoami */}
      <div>
        <div className="flex items-center gap-1">
          <span className="text-foreground">C:\Users\Ku6epXBOCTuK{">"}</span>
          <span className="text-foreground">whoami</span>
        </div>
        <div className="mt-2 ml-4">
          <p className="text-foreground">Ku6epXBOCTuK - developer & creative technologist</p>
          <p className="text-muted-foreground mt-1">{"// i build things for the web. mostly interesting, sometimes useful."}</p>
        </div>
      </div>

      {/* Currently doing */}
      <div>
        <div className="flex items-center gap-1">
          <span className="text-foreground">C:\Users\Ku6epXBOCTuK{">"}</span>
          <span className="text-foreground">type currently-doing.txt</span>
        </div>
        <p className="mt-2 ml-4 text-foreground">
          building products, writing code, exploring creative coding and generative art.
        </p>
      </div>

      {/* Links */}
      <div>
        <div className="flex items-center gap-1">
          <span className="text-foreground">C:\Users\Ku6epXBOCTuK{">"}</span>
          <span className="text-foreground">dir /b links\</span>
        </div>
        <ul className="mt-2 ml-4 space-y-1">
          {links.map((link) => (
            <li key={link.href} className="flex items-center gap-2">
              <Link
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[oklch(0.7_0.2_250)] hover:text-[oklch(0.85_0.25_250)] hover:underline underline-offset-2 font-bold"
              >
                [{link.label}]
              </Link>
              <span className="text-muted-foreground">- {link.desc}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Prompt */}
      <div className="flex items-center gap-1">
        <span className="text-foreground">C:\Users\Ku6epXBOCTuK{">"}</span>
        <span className="animate-pulse">_</span>
      </div>
    </main>
  )
}
