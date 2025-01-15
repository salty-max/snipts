import { BlocksIcon, Code2Icon } from "lucide-react"
import Link from "next/link"
import { NavLink } from "./nav-link"
import { ProLink } from "./pro-link"
import { SignedIn } from "@clerk/nextjs"
import { ProfileButton } from "./profile-button"

export const NavigationHeader = () => (
  <header className="sticky top-0 z-50 w-full">
    <div className="max-w-7xl mx-auto bg-c-crust px-4">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 group relative">
            {/* Logo Hover Effect */}
            <div className="absolute -inset-2 bg-gradient-to-r from-c-sapphire/20 to-c-mauve/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />

            {/* Logo */}
            <div className="relative bg-gradient-to-r from-c-mantle to-c-crust p-2 rounded-xl ring-1 ring-c-crust group-hover:ring-c-mantle transition-all">
              <BlocksIcon className="size-6 text-c-blue transform -rotate-6 group-hover:rotate-0 transition-transform duration-500" />
            </div>

            <div className="flex flex-col">
              <span className="block text-lg font-semibold bg-gradient-to-r from-c-blue to-c-mauve text-transparent bg-clip-text">
                Snipts
              </span>
              <span className="block text-sm text-c-blue/60 font-medium">
                Interactive Code Editor
              </span>
            </div>
          </Link>
          <NavLink href="/snippets" icon={Code2Icon}>
            Snippets
          </NavLink>
        </div>
        <div className="flex items-center gap-3">
          <ProLink />
          <SignedIn>
            <ProfileButton />
          </SignedIn>
        </div>
      </div>
    </div>
  </header>
)
