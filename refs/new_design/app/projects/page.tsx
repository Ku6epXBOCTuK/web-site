import { TerminalWindow } from "@/components/terminal-window"
import { TerminalNav } from "@/components/terminal-nav"
import { TerminalProjects } from "@/components/terminal-projects"
import { TerminalFooter } from "@/components/terminal-footer"

export default function ProjectsPage() {
  return (
    <TerminalWindow title="C:\Users\Ku6epXBOCTuK\projects - Command Prompt">
      <TerminalNav />
      <TerminalProjects />
      <TerminalFooter />
    </TerminalWindow>
  )
}
