"use client"

import { useCodeEditorStore } from "@/store/use-code-editor-store"
import { useEffect, useState } from "react"
import { defineMonacoThemes, LANGUAGE_CONFIG } from "../_constants"
import Image from "next/image"
import { RefreshCcwIcon, ShareIcon, TypeIcon } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Editor } from "@monaco-editor/react"
import { useClerk } from "@clerk/nextjs"
import { Skeleton } from "@/components/ui/skeleton"
import { useMounted } from "@/hooks/use-mounted"
import { JetBrains_Mono } from "next/font/google"
import { Button } from "@/components/ui/button"
import { ShareDialog } from "./share-dialog"

const jetBrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
})

export const EditorPanel = () => {
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)
  const { language, theme, fontSize, setFontSize, editor, setEditor } =
    useCodeEditorStore()
  const clerk = useClerk()
  const mounted = useMounted()

  const currentLanguage = LANGUAGE_CONFIG[language]

  useEffect(() => {
    const savedCode = localStorage.getItem(`snipts::editor-code-${language}`)
    const newCode = savedCode || currentLanguage.defaultCode

    if (editor) editor.setValue(newCode)
  }, [currentLanguage.defaultCode, language, editor])

  useEffect(() => {
    const savedFontSize = localStorage.getItem("snipts::editor-font-size")

    if (savedFontSize) setFontSize(parseInt(savedFontSize))
  }, [setFontSize])

  const handleRefresh = () => {
    const { defaultCode } = currentLanguage
    if (editor) editor.setValue(defaultCode)
    localStorage.setItem(`snipts::editor-code-${language}`, defaultCode)
  }

  const handleEditorChange = (value?: string) => {
    if (value) localStorage.setItem(`snipts::editor-code-${language}`, value)
  }

  const handleFontSizeChange = (newSize: number) => {
    const size = Math.min(Math.max(newSize, 12), 24)
    setFontSize(size)
  }

  if (!mounted) return null

  return (
    <div className="relative">
      <div className="relative bg-c-crust backdrop-blur rounded-xl ring-1 ring-white/[0.05] p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-10 rounded-lg ring-1 ring-white/5">
              <Image
                src={currentLanguage.logoPath}
                alt={currentLanguage.label}
                width={28}
                height={28}
              />
            </div>
            <div>
              <h2 className="text-sm font-medium">Code Editor</h2>
              <p className="text-xs text-gray-500">
                Write and execute your code
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg ring-1 ring-white/5">
              <TypeIcon className="size-4 text-gray-500" />
              <div className="flex items-center gap-3">
                <Slider
                  min={12}
                  max={24}
                  value={[fontSize]}
                  onValueChange={(value) => handleFontSizeChange(value[0])}
                  className="w-20 cursor-pointer"
                />
                <span className="text-sm font-medium text-gray-500 min-w-[2rem] text-center">
                  {fontSize}
                </span>
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              aria-label="Reset to default code"
              onClick={handleRefresh}
            >
              <RefreshCcwIcon className="size-4" />
            </Button>
            <ShareDialog />
          </div>
        </div>
        {/* Editor */}
        <div className="relative group rounded-lg overflow-hidden ring-1 ring-white/[0.05]">
          {clerk.loaded ? (
            <Editor
              height="600px"
              language={currentLanguage.monacoLanguage}
              onChange={handleEditorChange}
              theme={theme}
              beforeMount={defineMonacoThemes}
              onMount={(editor) => setEditor(editor)}
              options={{
                minimap: { enabled: false },
                fontSize,
                automaticLayout: true,
                scrollBeyondLastLine: false,
                padding: { top: 16, bottom: 16 },
                renderWhitespace: "selection",
                fontFamily: jetBrains.style.fontFamily,
                fontLigatures: true,
                cursorBlinking: "smooth",
                smoothScrolling: true,
                contextmenu: true,
                renderLineHighlight: "all",
                lineHeight: 1.6,
                letterSpacing: 0.5,
                roundedSelection: true,
                scrollbar: {
                  verticalScrollbarSize: 8,
                  horizontalScrollbarSize: 8,
                },
              }}
            />
          ) : (
            <Skeleton className="h-[600px] bg-c-mantle" />
          )}
        </div>
      </div>
    </div>
  )
}
