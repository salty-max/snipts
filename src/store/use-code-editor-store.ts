import { create } from "zustand"
import { MonacoEditor, type CodeEditorState } from "@/types"
import { LANGUAGE_CONFIG } from "@/app/(root)/_constants"

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
    runCode: async () => {
      const { language, getCode } = get()
      const code = getCode()
      if (!code) {
        set({ error: "No code to run" })
        return
      }

      set({ isRunning: true, error: null, output: "" })

      try {
        const runtime = LANGUAGE_CONFIG[language].pistonRuntime
        const response = await fetch("https://emkc.org/api/v2/piston/execute", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            language: runtime.language,
            version: runtime.version,
            files: [{ content: code }],
          }),
        })

        const data = await response.json()

        console.log("Data from piston", data)

        // Handle API-level errors
        if (data.message) {
          set({
            error: data.message,
            executionResult: { code, output: "", error: data.message },
          })
          return
        }

        // Handle compilation errors
        if (data.compile && data.compile.code !== 0) {
          const error = data.compile.stderr || data.compile.output
          set({ error, executionResult: { code, output: "", error } })
          return
        }

        // Handle runtime errors
        if (data.run && data.run.code !== 0) {
          const error = data.run.stderr || data.run.output
          set({ error, executionResult: { code, output: "", error } })
          return
        }

        const output = data.run.output
        set({
          output: output.trim(),
          error: null,
          executionResult: { code, output: output.trim(), error: null },
        })
      } catch (err) {
        console.error("Error running code:", err)
        set({
          error: "Error running code",
          executionResult: { code, output: "", error: "Error running code" },
        })
      } finally {
        set({ isRunning: false })
      }
    },
  }
})

export const getExecutionResult = () =>
  useCodeEditorStore.getState().executionResult
