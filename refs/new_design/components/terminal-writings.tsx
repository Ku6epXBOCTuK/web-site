export function TerminalWritings() {
  return (
    <main className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-1">
          <span className="text-foreground">C:\Users\Ku6epXBOCTuK{">"}</span>
          <span className="text-foreground">dir /b writings\</span>
        </div>
      </div>

      {/* Content */}
      <div className="ml-4">
        <p className="text-foreground font-bold">WRITINGS</p>
        <p className="text-muted-foreground mt-4">
          Directory is empty.
        </p>
        <p className="text-muted-foreground mt-2">
          Coming soon...
        </p>
      </div>

      {/* Prompt */}
      <div className="flex items-center gap-1 mt-8">
        <span className="text-foreground">C:\Users\Ku6epXBOCTuK{">"}</span>
        <span className="animate-pulse">_</span>
      </div>
    </main>
  )
}
