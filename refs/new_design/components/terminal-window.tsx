"use client"

import { ReactNode } from "react"
import { ThemeToggle } from "./theme-toggle"

interface TerminalWindowProps {
  title?: string
  children: ReactNode
}

export function TerminalWindow({ title = "Command Prompt", children }: TerminalWindowProps) {
  return (
    <div className="border border-border bg-background min-h-screen flex flex-col">
      {/* Windows title bar */}
      <div className="bg-[color:var(--cmd-titlebar)] px-2 py-1 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-white" viewBox="0 0 16 16" fill="currentColor">
            <rect x="1" y="1" width="6" height="6" />
            <rect x="9" y="1" width="6" height="6" />
            <rect x="1" y="9" width="6" height="6" />
            <rect x="9" y="9" width="6" height="6" />
          </svg>
          <span className="text-white text-sm">{title}</span>
        </div>
        <div className="flex items-center">
          <ThemeToggle />
          <button className="px-3 py-0.5 hover:bg-white/10 text-white text-sm" aria-label="Minimize">─</button>
          <button className="px-3 py-0.5 hover:bg-white/10 text-white text-sm" aria-label="Maximize">□</button>
          <button className="px-3 py-0.5 hover:bg-red-500 text-white text-sm" aria-label="Close">×</button>
        </div>
      </div>
      
      {/* Terminal content */}
      <div className="flex-1 p-4 overflow-auto">
        {children}
      </div>
    </div>
  )
}
