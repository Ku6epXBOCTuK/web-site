import { TerminalWindow } from "@/components/terminal-window"
import { TerminalNav } from "@/components/terminal-nav"
import { TerminalAbout } from "@/components/terminal-about"
import { TerminalFooter } from "@/components/terminal-footer"

export default function AboutPage() {
  return (
    <TerminalWindow title="C:\Users\Ku6epXBOCTuK\about - Command Prompt">
      <TerminalNav />
      <TerminalAbout />
      <TerminalFooter />
    </TerminalWindow>
  )
}
