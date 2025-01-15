"use client"

import { useAuth } from "@clerk/nextjs"
import { Id } from "../../../../convex/_generated/dataModel"
import { useMutation, useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { StarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

const StarButton = ({ snippetId }: { snippetId: Id<"snippets"> }) => {
  const { isSignedIn } = useAuth()

  const isStarred = useQuery(api.snippets.isSnippetStarred, { snippetId })
  const starCount = useQuery(api.snippets.getSnippetStarCount, { snippetId })
  const star = useMutation(api.snippets.starSnippet)

  if (isStarred === undefined || starCount === undefined) {
    return <Skeleton className="w-14 h-9" />
  }

  const handleStar = async () => {
    if (!isSignedIn) return
    await star({ snippetId })
  }

  return (
    <button
      className={cn(
        "group flex items-center gap-2 h-9 px-3 rounded-lg transition-colors duration-200 text-sm",
        isStarred
          ? "bg-c-yellow/10 text-c-yellow hover:bg-c-yellow/20"
          : "bg-transparent border border-input hover:bg-accent hover:text-accent-foreground",
      )}
      onClick={handleStar}
    >
      <StarIcon className="size-4" />
      <span>{starCount}</span>
    </button>
  )
}

export default StarButton
