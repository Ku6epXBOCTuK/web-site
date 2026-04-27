import Link from "next/link"
import Image from "next/image"

const projects = [
  {
    name: "brul",
    repo: "Ku6epXBOCTuK/brul",
    type: "experiment | ui library",
    description: "exploring native ui libraries for rust. experimenting with declarative, web-like syntax for building desktop applications without embedding a browser engine.",
    tags: ["rust"],
    link: "https://github.com/Ku6epXBOCTuK/brul",
    image: "https://opengraph.githubassets.com/1/Ku6epXBOCTuK/brul"
  },
  {
    name: "git-overhooks",
    repo: "Ku6epXBOCTuK/git-overhooks",
    type: "experiment | git hooks",
    description: "exploring a rust-based utility for managing git hooks. aims to simplify hook installation, sharing, and version control across projects.",
    tags: ["rust"],
    link: "https://github.com/Ku6epXBOCTuK/git-overhooks",
    image: "https://opengraph.githubassets.com/1/Ku6epXBOCTuK/git-overhooks"
  },
  {
    name: "itd",
    repo: "Ku6epXBOCTuK/itd",
    type: "game | idle tower defence",
    description: "idle tower defence game built with three.js and miniplex ecs.",
    tags: ["three.js", "miniplex", "svelte"],
    link: "https://github.com/Ku6epXBOCTuK/itd",
    image: "https://opengraph.githubassets.com/1/Ku6epXBOCTuK/itd"
  },
  {
    name: "now-playing",
    repo: "Ku6epXBOCTuK/now_playing",
    type: "widget | obs browser source",
    description: "obs browser source widget that displays the currently playing track. reads from a simple text file updated by your music player.",
    tags: ["html", "css", "javascript"],
    link: "https://github.com/Ku6epXBOCTuK/now_playing",
    image: "https://opengraph.githubassets.com/1/Ku6epXBOCTuK/now_playing"
  },
  {
    name: "sveltekit-template",
    repo: "Ku6epXBOCTuK/sveltekit-template",
    type: "template | sveltekit starter",
    description: "personal sveltekit project template with typescript, prettier, eslint, vitest for unit/component tests, and playwright for e2e testing.",
    tags: ["svelte", "typescript", "vitest", "playwright"],
    link: "https://github.com/Ku6epXBOCTuK/sveltekit-template",
    image: "https://opengraph.githubassets.com/1/Ku6epXBOCTuK/sveltekit-template"
  },
  {
    name: "twitch-panels",
    repo: "Ku6epXBOCTuK/twitch-panels",
    type: "tool | twitch panels creator",
    description: "visual editor for creating custom twitch panels. drag and drop, image upload with cropping, text styling.",
    tags: ["svelte5", "konva.js", "typescript"],
    link: "https://github.com/Ku6epXBOCTuK/twitch-panels",
    image: "https://opengraph.githubassets.com/1/Ku6epXBOCTuK/twitch-panels"
  },
  {
    name: "XBOCT-page",
    repo: "Ku6epXBOCTuK/XBOCT-page",
    type: "extension | newtab replacement",
    description: "chrome extension that replaces the newtab page. offline-first approach.",
    tags: ["svelte5", "typescript", "vite"],
    link: "https://github.com/Ku6epXBOCTuK/XBOCT-page",
    image: "https://opengraph.githubassets.com/1/Ku6epXBOCTuK/XBOCT-page"
  },
]

export function TerminalProjects() {
  return (
    <main className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-1">
          <span className="text-foreground">C:\Users\Ku6epXBOCTuK{">"}</span>
          <span className="text-foreground">cd projects && dir</span>
        </div>
        <div className="mt-2 ml-4">
          <p className="text-foreground font-bold text-lg">PROJECTS</p>
          <p className="text-muted-foreground text-sm mt-1">
            Directory of C:\Users\Ku6epXBOCTuK\projects
          </p>
        </div>
      </div>

      {/* Projects list */}
      <div className="space-y-8 mt-6">
        {projects.map((project) => (
          <div key={project.name} className="border border-border p-4">
            {/* Project header */}
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
              <span>{project.repo}</span>
            </div>

            {/* Project image - smaller */}
            <div className="mb-3 max-w-[280px]">
              <Image
                src={project.image}
                alt={project.name}
                width={280}
                height={140}
                className="border border-border"
              />
            </div>

            {/* Project name as link - more visible */}
            <Link
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[oklch(0.7_0.2_250)] hover:text-[oklch(0.85_0.25_250)] hover:underline underline-offset-2 font-bold text-lg inline-block"
            >
              [{project.name}]
            </Link>

            {/* Project type */}
            <div className="text-muted-foreground text-sm mt-1">
              {project.type}
            </div>

            {/* Description with link highlighted */}
            <p className="text-foreground mt-2 leading-relaxed">
              {project.description}
              {" "}
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[oklch(0.7_0.2_250)] hover:text-[oklch(0.85_0.25_250)] hover:underline underline-offset-2"
              >
                [view on github]
              </Link>
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[oklch(0.6_0.15_180)] text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Prompt */}
      <div className="flex items-center gap-1 mt-8">
        <span className="text-foreground">C:\Users\Ku6epXBOCTuK\projects{">"}</span>
        <span className="animate-pulse">_</span>
      </div>
    </main>
  )
}
