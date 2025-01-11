import { editor } from "monaco-editor"
import { Id } from "../../convex/_generated/dataModel"

export type MonacoEditor = editor.IStandaloneCodeEditor

export interface Theme {
  id: string
  label: string
  color: string
  isDark: boolean
  logoPath: string
}

export interface ThemeDefinition {
  base: editor.BuiltinTheme
  inherit: boolean
  rules: { token: string; foreground: string }[]
  colors: Record<string, string>
}

export interface Language {
  id: string
  label: string
  logoPath: string
  monacoLanguage: string
  defaultCode: string
  pistonRuntime: LanguageRuntime
}

export interface LanguageRuntime {
  language: string
  version: string
}

export interface ExecuteCodeResponse {
  compile?: {
    output: string
  }
  run?: {
    output: string
    stderr: string
  }
}

export interface ExecutionResult {
  code: string
  output: string
  error: string | null
}

export interface CodeEditorState {
  language: string
  theme: string
  fontSize: number
  isRunning: boolean
  output: string
  error: string | null
  editor: MonacoEditor | null
  executionResult: ExecutionResult | null
  setEditor: (editor: MonacoEditor) => void
  setLanguage: (language: string) => void
  setTheme: (theme: string) => void
  setFontSize: (fontSize: number) => void
  getCode: () => string
  runCode: () => Promise<void>
}

export interface Snippet {
  _id: Id<"snippets">
  _creationTime: number
  userId: string
  language: string
  code: string
  title: string
  username: string
}
