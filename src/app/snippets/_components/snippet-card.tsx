"use client"

import { LANGUAGE_CONFIG } from "@/app/(root)/_constants"
import { type Snippet } from "@/types"
import { useUser } from "@clerk/nextjs"
import { ClockIcon, Trash2Icon, UserIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import StarButton from "./star-button"
import { Button } from "@/components/ui/button"
import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { Skeleton } from "@/components/ui/skeleton"

export const SnippetCard = ({ snippet }: { snippet: Snippet }) => {
  const { user } = useUser()
  const convexUser = useQuery(api.users.getUser, {
    userId: user?.id || "",
  })

  const language = LANGUAGE_CONFIG[snippet.language]
  const handleDelete = async () => {}

  return (
    <Link href="/">
      <div className="group relative h-full bg-c-mantle rounded-xl border-c-base/50 hover:border-c-base transition-all duration-300 overflow-hidden">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-c-blue to-c-mauve rounded-lg blur opacity-20 group-hover:opacity-30 transition-all duration-500" />
                <div className="p-2 rounded-lg bg-gradient-to-r from-c-blue/10 to-c-mauve/10 group-hover:from-c-blue/20 group-hover:to-c-mauve/20 transition-all duration-500">
                  <Image
                    src={language.logoPath}
                    alt={language.id}
                    className="size-6 object-contain z-10"
                    width={24}
                    height={24}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <span className="px-3 py-1 bg-c-blue/10 text-c-blue rounded-lg text-xs">
                  {language.label}
                </span>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <ClockIcon className="size-3" />
                  {new Date(snippet._creationTime).toLocaleString()}
                </div>
              </div>
            </div>
            <div
              className="absolute top-5 right-5 z-10 flex gap-3 items-center"
              onClick={(e) => e.preventDefault()}
            >
              <StarButton snippetId={snippet._id} />
              {convexUser === undefined ? (
                <Skeleton className="size-9" />
              ) : (
                convexUser?._id === snippet.userId && (
                  <Button size="icon" variant="outline">
                    <Trash2Icon
                      className="size-4"
                      onClick={() => handleDelete()}
                    />
                  </Button>
                )
              )}
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-2 line-clamp-1 group-hover:text-c-blue transition-colors">
                {snippet.title}
              </h2>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded-md bg-c-mantle/80">
                    <UserIcon className="size-3" />
                  </div>
                  <span className="truncate max-w-[150px]">
                    {snippet.username}
                  </span>
                </div>
              </div>
            </div>
            <div className="relative group/code">
              <div className="absolute inset-0 bg-gradient-to-r from-c-blue/15 to-c-mauve/5 rounded-lg opacity-0 group-hover/code:opacity-100 transition-all" />
              <pre className="bg-c-crust rounded-lg p-4 overflow-hidden text-sm font-mono line-clamp-3">
                {snippet.code}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
