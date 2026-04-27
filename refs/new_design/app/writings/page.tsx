import { TerminalWindow } from "@/components/terminal-window"
import { TerminalNav } from "@/components/terminal-nav"
import { TerminalWritings } from "@/components/terminal-writings"
import { TerminalFooter } from "@/components/terminal-footer"

export default function WritingsPage() {
  return (
    <TerminalWindow title="C:\Users\Ku6epXBOCTuK\writings - Command Prompt">
      <TerminalNav />
      <TerminalWritings />
      <TerminalFooter />
    </TerminalWindow>
  )
}
