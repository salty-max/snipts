"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDownIcon, MoonIcon, SunIcon } from "lucide-react"
import { THEMES } from "../_constants"
import { useCodeEditorStore } from "@/store/use-code-editor-store"
import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "@radix-ui/react-dropdown-menu"
import Image from "next/image"
import { useMounted } from "@/hooks/use-mounted"

export const ThemeSelector = () => {
  const [open, setOpen] = useState(false)
  const mounted = useMounted()
  const { theme, setTheme } = useCodeEditorStore()

  const currentTheme = THEMES.find((t) => t.id === theme)
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
            <div className="size-6 flex items-center justify-center bg-c-mantle p-0.5 rounded-md overflow-hidden group-hover:scale-110 transition-transform">
              <Image
                className="rounded-full"
                src={currentTheme!.logoPath}
                alt={currentTheme!.label}
                width={18}
                height={18}
              />
            </div>

            <span className="w-24 truncate text-left text-sm font-medium">
              {currentTheme?.label}
            </span>
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
        <DropdownMenuGroup>
          <DropdownMenuLabel className="p-2 text-sm">
            Select Theme
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {THEMES.map((t) => (
            <DropdownMenuItem
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={cn(
                "relative group flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg cursor-pointer duration-200",
                theme === t.id && "bg-c-blue/5 text-c-blue",
              )}
            >
              <div className="absolute inset-0 rounded-md bg-gradient-to-r from-c-blue/20 to-c-mauve/20 opacity-0 group-hover:opacity-100 transition-opacity" />

              {theme === t.id && (
                <div className="absolute inset-0 border-2 border-c-blue/30 rounded-lg" />
              )}

              <div className="flex items-center gap-x-2">
                <div className="size-6 flex items-center justify-center bg-c-crust p-0.5 rounded-md">
                  <Image
                    className="rounded-md"
                    src={t.logoPath}
                    alt={t.label}
                    width={18}
                    height={18}
                  />
                </div>
                {t.label}
              </div>

              {t.isDark ? (
                <MoonIcon className="size-4" />
              ) : (
                <SunIcon className="size-4" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
