"use client"

import { useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"
import { useState } from "react"
import { SnippetsPageSkeleton } from "./_components/snippets-page-skeleton"
import { BookOpenIcon, SearchIcon, TagIcon } from "lucide-react"
import { Input } from "@/components/ui/input"

const SnippetsPage = () => {
  const snippets = useQuery(api.snippets.getSnippets)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)
  const [view, setView] = useState<"grid" | "list">("grid")

  if (snippets === undefined) {
    return <SnippetsPageSkeleton />
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
          </div>
        </div>
      </div>
    </>
  )
}

export default SnippetsPage
