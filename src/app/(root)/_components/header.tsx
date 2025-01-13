import { currentUser } from "@clerk/nextjs/server"
import { ConvexHttpClient } from "convex/browser"
import { api } from "../../../../convex/_generated/api"
import Link, { LinkProps } from "next/link"
import { BlocksIcon, Code2Icon, LucideIcon, SparklesIcon } from "lucide-react"
import { SignedIn } from "@clerk/nextjs"
import { ThemeSelector } from "./theme-selector"
import { LanguageSelector } from "./language-selector"
import { RunButton } from "./run-button"
import { ProfileButton } from "@/components/profile-button"

export const Header = async () => {
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)
  const user = await currentUser()

  const convexUser = await convex.query(api.users.getUser, {
    userId: user?.id || "",
  })

  return (
    <header className="relative z-10">
      <div className="flex items-center lg:justify-between justify-center bg-c-crust backdrop-blur-xl p-6 mb-4 rounded-xl">
        <div className="hidden lg:flex items-center gap-8">
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
              <span className="block text-xs text-c-blue/60 font-medium">
                Interactive Snippets Editor
              </span>
            </div>
          </Link>
          <nav className="flex items-center space-x-1">
            <NavLink href="/snippets" icon={Code2Icon}>
              Snippets
            </NavLink>{" "}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <ThemeSelector />
            <LanguageSelector hasAccess={Boolean(convexUser?.isPro)} />
            <SignedIn>
              <RunButton />
            </SignedIn>
          </div>
          <div className="pl-4 border-l border-border flex items-center gap-3">
            {!convexUser?.isPro && (
              <Link
                href="/pricing"
                className="relative group flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-c-yellow/40 to-c-maroon/40 hover:from-c-yellow/30 hover:to-c-maroon/30 transition-all duration-300"
              >
                <SparklesIcon className="size-4 text-c-peach group-hover:text-c-peach/70 rotate-0 group-hover:rotate-3" />
                <span className="text-sm font-medium text-c-peach/90 group-hover:text-c-peach/70">
                  Pro
                </span>
              </Link>
            )}
            <ProfileButton />
          </div>
        </div>
      </div>
    </header>
  )
}

interface NavLinkProps extends LinkProps {
  icon?: LucideIcon
  children: React.ReactNode
}

const NavLink = ({ href, icon: Icon, children }: NavLinkProps) => (
  <Link
    href={href}
    className="relative group flex items-center gap-2 px-4 py-2 rounded-lg bg-c-mantle hover:bg-primary/10 0 transition-all duration-300 shadow-lg overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-c-blue/20 to-c-mauve/20 opacity-0 group-hover:opacity-100 transition-opacity" />
    {Icon && (
      <Icon className="w-4 h-4 relative z-10 group-hover:rotate-3 transition-transform" />
    )}
    <span className="text-sm font-medium relative z-10 transition-colors">
      {children}
    </span>
  </Link>
)
