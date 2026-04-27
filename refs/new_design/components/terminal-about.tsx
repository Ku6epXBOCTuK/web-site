export function TerminalAbout() {
  return (
    <main className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-1">
          <span className="text-foreground">C:\Users\Ku6epXBOCTuK{">"}</span>
          <span className="text-foreground">type about.txt</span>
        </div>
      </div>

      {/* About content */}
      <div className="ml-4 space-y-4">
        <div>
          <p className="text-foreground font-bold">ABOUT ME</p>
          <p className="text-foreground mt-2 leading-relaxed">
            Hi, I&apos;m Ku6epXBOCTuK - a developer and creative technologist
            passionate about building interesting things for the web.
          </p>
        </div>

        <div>
          <p className="text-foreground font-bold">WHAT I DO</p>
          <ul className="mt-2 space-y-1 text-foreground">
            <li>- Web development (frontend & backend)</li>
            <li>- Creative coding and generative art</li>
            <li>- Game development experiments</li>
            <li>- Open source projects</li>
            <li>- Streaming coding sessions on Twitch</li>
          </ul>
        </div>

        <div>
          <p className="text-foreground font-bold">TECH STACK</p>
          <ul className="mt-2 space-y-1 text-foreground">
            <li>- Languages: TypeScript, JavaScript, Rust, HTML/CSS</li>
            <li>- Frameworks: Svelte/SvelteKit, React, Three.js</li>
            <li>- Tools: VS Code, Git, Vite, Playwright, Vitest</li>
          </ul>
        </div>

        <div>
          <p className="text-foreground font-bold">CURRENTLY</p>
          <p className="text-foreground mt-2 leading-relaxed">
            Building products, exploring native UI libraries with Rust,
            and streaming development sessions.
          </p>
        </div>
      </div>

      {/* Prompt */}
      <div className="flex items-center gap-1 mt-8">
        <span className="text-foreground">C:\Users\Ku6epXBOCTuK{">"}</span>
        <span className="animate-pulse">_</span>
      </div>
    </main>
  )
}
