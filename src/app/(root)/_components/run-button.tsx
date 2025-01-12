"use client"

import {
  getExecutionResult,
  useCodeEditorStore,
} from "@/store/use-code-editor-store"
import { useUser } from "@clerk/nextjs"
import { useMutation } from "convex/react"
import { Loader2Icon, PlayIcon } from "lucide-react"
import { api } from "../../../../convex/_generated/api"
import { Button } from "@/components/ui/button"

export const RunButton = () => {
  const { user } = useUser()
  const { language, isRunning, runCode } = useCodeEditorStore()
  const saveExecution = useMutation(api.codeExecutions.saveExecution)

  const handleRun = async () => {
    await runCode()
    const result = getExecutionResult()

    if (user && result) {
      await saveExecution({
        language,
        code: result.code,
        output: result.output || undefined,
        error: result.error || undefined,
      })
    }
  }

  return (
    <Button
      size="lg"
      disabled={isRunning}
      aria-disabled={isRunning}
      aria-label="Run code"
      onClick={handleRun}
    >
      {isRunning ? (
        <>
          <div className="relative">
            <Loader2Icon className="size-4 animate-spin" />
            <div className="absolute inset-0 blur animate-pulse" />
          </div>
          Executing
        </>
      ) : (
        <>
          <PlayIcon className="size-4 transition-transform" />
          Run Code
        </>
      )}
    </Button>
  )
}
