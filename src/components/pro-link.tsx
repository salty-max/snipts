import Link from "next/link"
import { SparklesIcon } from "lucide-react"

export const ProLink = async () => (
  <Link
    href="/pricing"
    className="relative group flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-c-yellow/40 to-c-maroon/40 hover:from-c-yellow/30 hover:to-c-maroon/30 transition-all duration-300"
  >
    <SparklesIcon className="size-4 text-c-peach group-hover:text-c-peach/70 rotate-0 group-hover:rotate-3" />
    <span className="text-sm font-medium text-c-peach/90 group-hover:text-c-peach/70">
      Pro
    </span>
  </Link>
)
