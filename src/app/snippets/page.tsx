"use client"

import { useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"
import { useState } from "react"
import { SnippetsPageSkeleton } from "./_components/snippets-page-skeleton"
import {
  BookOpenIcon,
  CodeIcon,
  GridIcon,
  LayersIcon,
  SearchIcon,
  TagIcon,
  XIcon,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { LANGUAGE_CONFIG } from "../(root)/_constants"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { SnippetCard } from "./_components/snippet-card"

const SnippetsPage = () => {
  const snippets = useQuery(api.snippets.getSnippets)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)
  const [view, setView] = useState<"grid" | "list">("grid")

  if (snippets === undefined) {
    return <SnippetsPageSkeleton />
  }

  const languages = [
    ...new Map(
      snippets.map((s) => {
        const { label, logoPath } = LANGUAGE_CONFIG[s.language]
        return [
          s.language,
          {
            id: s.language,
            logoPath,
            label,
          },
        ]
      }),
    ).values(),
  ]
  const popularLanguages = languages.slice(0, 5)

  const filteredSnippets = snippets.filter((snippet) => {
    const matchesSearch =
      snippet.title.toLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
      snippet.language.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.username.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLanguage =
      !selectedLanguage || snippet.language === selectedLanguage

    return matchesSearch && matchesLanguage
  })

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedLanguage(null)
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-c-blue/10 to-c-mauve/10 text-sm">
            <BookOpenIcon className="size-4" />
            Community Code Library
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-c-blue to-c-mauve text-transparent bg-clip-text">
            Discover &amp; Share Code Snippets
          </h1>
          <p className="text-lg">
            Explore a curated collection of code snippets from the community
          </p>
        </div>
        <div className="max-w-5xl mx-auto mb-12 space-y-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-c-blue/20 to-c-mauve/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <div className="relative flex items-center">
              <SearchIcon className="absolute left-4 size-5 text-primary/80" />
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search snippets by title, language, author..."
                className="w-full pl-12 pr-4 py-7 rounded-xl bg-c-mantle border-0 focus-visible:ring-2 focus-visible:ring-c-blue/50 placeholder:text-gray-500 transition-all"
              />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-c-mantle rounded-lg">
              <TagIcon className="size-4 text-primary/80" />
              <span className="text-sm">Languages:</span>
            </div>
            {popularLanguages.map((l) => (
              <Button
                key={l.id}
                variant="outline"
                className="relative overflow-hidden"
                onClick={() => setSelectedLanguage(l.id)}
              >
                {selectedLanguage === l.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-c-blue/20 to-c-mauve/20 rounded-lg" />
                )}
                <Image src={l.logoPath} alt={l.id} width={16} height={16} />
                {l.label}
              </Button>
            ))}
            {selectedLanguage && (
              <Button
                variant="outline"
                onClick={() => setSelectedLanguage(null)}
              >
                <XIcon className="size-4" />
                Clear
              </Button>
            )}
            <div className="ml-auto flex items-center gap-3">
              <span>{filteredSnippets.length} snippets found</span>
              <div className="flex items-center gap-1">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setView("grid")}
                >
                  <GridIcon className="size-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setView("list")}
                >
                  <LayersIcon className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div
          className={cn(
            "grid gap-6",
            view === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1 max-w-3xl mx-auto",
          )}
        >
          {filteredSnippets.map((snippet) => (
            <SnippetCard key={snippet._id} snippet={snippet} />
          ))}
        </div>
        {filteredSnippets.length === 0 && (
          <div className="max-w-md mx-auto mt-20 p-8 rounded-2xl">
            <div className="text-center">
              <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-gradient-to-br from-c-blue/10 to-c-mauve/10 ring-1 ring-white/10 mb-6">
                <CodeIcon className="size-8 text-gray-400" />
              </div>
              <h3 className="text-xl mb-3">No snippets found</h3>
              <p className="text-gray-400 mb-6">
                {searchQuery || selectedLanguage
                  ? "Try adjusting your search query or filters"
                  : "Be the first to share a code snippet!"}
              </p>
              {(searchQuery || selectedLanguage) && (
                <Button onClick={clearFilters}>
                  <XIcon className="size-4" />
                  Clear all filters
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default SnippetsPage
