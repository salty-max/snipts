import { create } from "zustand"
import { MonacoEditor, type CodeEditorState } from "@/types"

const getInitialState = () => {
  const defaultState = {
    language: "javascript",
    fontSize: 16,
    theme: "vs-dark",
  }

  // If on server side, return default values
  if (typeof window === "undefined") {
    return defaultState
  }

  // If on client side, return values from local storage
  // since it is a browser API
  const savedLanguage =
    localStorage.getItem("snipts::editor-language") || "javascript"
  const savedTheme = localStorage.getItem("snipts::editor-theme") || "vs-dark"
  const savedFontSize =
    Number(localStorage.getItem("snipts::editor-font-size")) || 16

  return {
    language: savedLanguage,
    fontSize: savedFontSize,
    theme: savedTheme,
  }
}

export const useCodeEditorStore = create<CodeEditorState>((set, get) => {
  const initialState = getInitialState()

  return {
    ...initialState,
    output: "",
    isRunning: false,
    error: null,
    editor: null,
    executionResult: null,
    setEditor: (editor: MonacoEditor) => {
      const savedCode = localStorage.getItem(
        `snipts::editor-code-${get().language}`,
      )

      if (savedCode) editor.setValue(savedCode)

      set({ editor })
    },
    setTheme: (theme: string) => {
      localStorage.setItem("snipts::editor-theme", theme)
      set({ theme })
    },
    setFontSize: (fontSize: number) => {
      localStorage.setItem("snipts::editor-font-size", fontSize.toString())
      set({ fontSize })
    },
    setLanguage: (language: string) => {
      // Save current language code before switching
      const currentCode = get().editor?.getValue()
      if (currentCode) {
        localStorage.setItem(
          `snipts::editor-code-${get().language}`,
          currentCode,
        )
      }

      localStorage.setItem("snipts::editor-language", language)

      set({
        language,
        output: "",
        error: null,
      })
    },
    getCode: () => get().editor?.getValue() || "",
    runCode: () => {},
  }
})
