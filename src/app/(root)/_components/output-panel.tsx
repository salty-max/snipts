"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useMounted } from "@/hooks/use-mounted"
import { useCodeEditorStore } from "@/store/use-code-editor-store"
import {
  AlertTriangleIcon,
  CircleCheckIcon,
  ClockIcon,
  CopyCheckIcon,
  CopyIcon,
  TerminalIcon,
} from "lucide-react"
import { JetBrains_Mono } from "next/font/google"
import { useState } from "react"

const jetBrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

export const OutputPanel = () => {
  const [isCopied, setIsCopied] = useState(false)
  const { output, error, isRunning } = useCodeEditorStore()
  const mounted = useMounted()

  const hasContent = output || error

  const handleCopy = async () => {
    if (!hasContent) return

    if (output) await navigator.clipboard.writeText(output)
    if (error) await navigator.clipboard.writeText(error)

    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  if (!mounted) return null

  return (
    <Card className="bg-c-mantle border-0">
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-10 rounded-lg bg-c-mantle ring-1 ring-white/[0.05]">
            <TerminalIcon className="size-5 text-c-blue" />
          </div>
          <div>
            <h2 className="text-sm font-medium">Output</h2>
            <p className="text-xs text-gray-500">
              What could possibly go wrong?
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="icon"
          aria-label="Copy output"
          onClick={handleCopy}
          disabled={!hasContent || isCopied}
        >
          {isCopied ? (
            <CopyCheckIcon className="size-4" />
          ) : (
            <CopyIcon className="size-4" />
          )}
        </Button>
      </CardHeader>
      {/* Output */}
      <CardContent>
        <div
          style={{ fontFamily: jetBrains.style.fontFamily }}
          className={`relative bg-c-crust rounded-xl p-4 h-[600px] overflow-auto text-sm`}
        >
          {isRunning ? (
            <RunningCodeSkeleton />
          ) : error ? (
            <div className="flex items-start gap-3 text-destructive">
              <AlertTriangleIcon className="size-5 flex-shrink-0" />
              <div className="space-y-1">
                <div className="font-semibold">Execution Error</div>
                <pre
                  style={{ fontFamily: jetBrains.style.fontFamily }}
                  className="whitespace-pre-wrap text-destructive/80"
                >
                  {error}
                </pre>
              </div>
            </div>
          ) : output ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-c-green mb-3">
                <CircleCheckIcon className="size-5" />
                <span className="font-semibold">Execution Successfull</span>
              </div>
              <pre
                style={{ fontFamily: jetBrains.style.fontFamily }}
                className="whitespace-pre-wrap"
              >
                {output}
              </pre>
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
      </CardContent>
    </Card>
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
