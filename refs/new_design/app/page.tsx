import { TerminalWindow } from "@/components/terminal-window"
import { TerminalNav } from "@/components/terminal-nav"
import { TerminalHome } from "@/components/terminal-home"
import { TerminalFooter } from "@/components/terminal-footer"

export default function Home() {
  return (
    <TerminalWindow title="C:\Users\Ku6epXBOCTuK - Command Prompt">
      <TerminalNav />
      <TerminalHome />
      <TerminalFooter />
    </TerminalWindow>
  )
}
