import { FREE_LANGUAGES } from "../_constants"

export const isProLanguage = (language: string) =>
  !FREE_LANGUAGES.includes(language)
