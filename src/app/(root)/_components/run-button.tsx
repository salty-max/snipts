"use client"

import { useCodeEditorStore } from "@/store/use-code-editor-store"
import { useUser } from "@clerk/nextjs"
import { Loader2Icon, PlayIcon } from "lucide-react"

export const RunButton = () => {
  const { user } = useUser()
  const { language, executionResult, isRunning, runCode } = useCodeEditorStore()

  const handleRun = async () => {
    await runCode()

    if (user && executionResult) {
      // TODO: Save result to convex
    }
  }

  return (
    <button
      className="group relative inline-flex items-center gap-3 px-4 py-2.5"
      disabled={isRunning}
      aria-disabled={isRunning}
      aria-label="Run code"
      onClick={handleRun}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-c-blue/80 to-c-mauve/80 rounded-lg opacity-100 transition-opacity group-hover:opacity-90" />
      <div className="relative flex items-center gap-2">
        {isRunning ? (
          <>
            <div className="relative">
              <Loader2Icon className="size-4 animate-spin" />
              <div className="absolute inset-0 blur animate-pulse" />
            </div>
            <span className="text-sm font-medium">Executing...</span>
          </>
        ) : (
          <>
            <div className="relative flex items-center justify-center size-4">
              <PlayIcon className="size-4 transition-transform group-hover:scale-110" />
            </div>
            <span className="text-sm font-medium">Run Code</span>
          </>
        )}
      </div>
    </button>
  )
}
