"use client"

import { Button } from "@/components/ui/button"
import { useMounted } from "@/hooks/use-mounted"
import { useCodeEditorStore } from "@/store/use-code-editor-store"
import {
  AlertTriangleIcon,
  CheckCheckIcon,
  ClockIcon,
  CopyCheckIcon,
  CopyIcon,
  TerminalIcon,
} from "lucide-react"
import { useState } from "react"

export const OutputPanel = () => {
  const [isCopied, setIsCopied] = useState(false)
  const { output, error, isRunning } = useCodeEditorStore()
  const mounted = useMounted()

  const hasContent = !!output || !!error

  const handleCopy = async () => {
    if (!output || !error) return

    await navigator.clipboard.writeText(output || error)
    setIsCopied(true)

    setTimeout(() => setIsCopied(false), 2000)
  }

  if (!mounted) return null

  return (
    <div className="relative bg-c-mantle rounded-xl p-4 ring-1 ring-white/[0.05]">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center size-6 rounded-lg bg-c-mantle ring-1 ring-white/[0.05]">
            <TerminalIcon className="size-4 text-c-blue" />
          </div>
          <span className="text-sm font-medium">Output</span>
        </div>
        <Button
          variant="outline"
          size="icon"
          aria-label="Copy output"
          onClick={handleCopy}
          disabled={!hasContent}
        >
          {isCopied ? (
            <CopyCheckIcon className="size-4" />
          ) : (
            <CopyIcon className="size-4" />
          )}
        </Button>
      </div>
      {/* Output */}
      <div className="relative">
        <div className="relative bg-c-mantle/50 backdrop-blur-sm rounded-xl p-4 h-[600px] overflow-auto font-mono text-sm">
          {isRunning ? (
            <RunningCodeSkeleton />
          ) : error ? (
            <div className="flex items-start gap-3 text-destructive">
              <AlertTriangleIcon className="size-5 flex-shrink-0 mt-1" />
              <div className="space-y-1">
                <div className="font-medium">Execution Error</div>
                <div className="whitespace-pre-wrap text-destructive/80">
                  {error}
                </div>
              </div>
            </div>
          ) : output ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-c-sky mb-3">
                <CheckCheckIcon className="size-5" />
                <span className="font-medium">Execution Successfull</span>
              </div>
              <pre className="whitespace-pre-wrap">{output}</pre>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center">
              <div className="flex items-center justify-center size-12 rounded-xl bg-c-mantle ring-1 ring-white/[0.05] mb-4">
                <ClockIcon className="size-6" />
              </div>
              <p className="text-center">
                Run your code to see the output here...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const RunningCodeSkeleton = () => (
  <div className="space-y-4 animate-pulse">
    <div className="space-y-2">
      <div className="h-4 bg-c-base rounded w-3/4" />
      <div className="h-4 bg-c-base rounded w-1/2" />
      <div className="h-4 bg-c-base rounded w-5/6" />
    </div>
    <div className="space-y-2 pt-4">
      <div className="h-4 bg-c-base rounded w-2/3" />
      <div className="h-4 bg-c-base rounded w-4/5" />
      <div className="h-4 bg-c-base rounded w-3/4" />
    </div>
  </div>
)
