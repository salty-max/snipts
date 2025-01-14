import { LucideIcon } from "lucide-react"
import Link, { LinkProps } from "next/link"

interface NavLinkProps extends LinkProps {
  icon?: LucideIcon
  children: React.ReactNode
}

export const NavLink = ({ href, icon: Icon, children }: NavLinkProps) => (
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
