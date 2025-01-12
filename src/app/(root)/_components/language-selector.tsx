"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCodeEditorStore } from "@/store/use-code-editor-store"
import Image from "next/image"
import { useState } from "react"
import { LANGUAGE_CONFIG } from "../_constants"
import { ChevronDownIcon, LockIcon, SparklesIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu"
import { useMounted } from "@/hooks/use-mounted"
import { isProLanguage } from "../_utils"

interface LanguageSelectorProps {
  hasAccess: boolean
}

export const LanguageSelector = ({ hasAccess }: LanguageSelectorProps) => {
  const [open, setOpen] = useState(false)
  const mounted = useMounted()
  const { language, setLanguage } = useCodeEditorStore()

  const currentLanguage = LANGUAGE_CONFIG[language]

  const checkLockedLanguage = (language: string) =>
    !hasAccess && isProLanguage(language)

  const handleLanguageSelect = (language: string) => {
    if (checkLockedLanguage(language)) return
    setLanguage(language)
  }

  if (!mounted) return null

  return (
    <DropdownMenu onOpenChange={() => setOpen(!open)}>
      <DropdownMenuTrigger asChild>
        <button className="w-48 group relative flex items-center justify-between gap-3 px-4 py-2 bg-c-mantle rounded-lg transition-colors duration-200 border border-c-mantle/50 hover:border-c-base focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
          {/* Decoration */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-c-blue/20 to-c-mauve/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
            aria-hidden
          />
          <div className="flex items-center gap-x-2">
            <div className="size-6 rounded-md bg-c-mantle/80 p-0.5 group-hover:scale-110 transition-transform">
              <Image
                src={currentLanguage.logoPath}
                alt={currentLanguage.label}
                width={20}
                height={20}
              />
            </div>
            <span className="text-sm font-medium">{currentLanguage.label}</span>
          </div>
          <ChevronDownIcon
            className={cn(
              "size-4 transform rotate-0 transition-transform",
              !!open && "rotate-180",
            )}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-56 rounded-lg">
        <DropdownMenuLabel className="p-2 text-sm">
          Select Language
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {Object.values(LANGUAGE_CONFIG).map((l) => (
          <DropdownMenuItem
            key={l.id}
            className={cn(
              "relative group flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg cursor-pointer duration-200",
              language === l.id && "bg-c-blue/10 text-c-blue",
            )}
            disabled={checkLockedLanguage(l.id)}
            onClick={() => handleLanguageSelect(l.id)}
          >
            <div className="absolute inset-0 rounded-md bg-gradient-to-r from-c-blue/20 to-c-mauve/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            {language === l.id && (
              <div className="absolute inset-0 border-2 border-c-blue/30 rounded-lg" />
            )}
            <div className="flex items-center gap-x-2">
              <div className="size-6 flex items-center justify-center bg-c-crust p-0.5 rounded-md">
                <Image src={l.logoPath} alt={l.label} width={20} height={20} />
              </div>
              {l.label}
            </div>
            {checkLockedLanguage(l.id) ? (
              <LockIcon className="size-4" />
            ) : (
              <SparklesIcon className="size-4" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
