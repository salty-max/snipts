import { HeartIcon } from "lucide-react"
import Link, { LinkProps } from "next/link"

export const Footer = () => (
  <footer className="relative border-t border-border mt-auto">
    <div className="absolute inset-x-0 -top-px h-px bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="flex items-center">
              &copy;&nbsp;{new Date().getFullYear()} - Built with&nbsp;
              <HeartIcon className="size-5 text-destructive animate-pulse" />
              &nbsp;by&nbsp;
              <FooterLink target="_blank" href="https://jellycat.fr">
                Jellycat
              </FooterLink>
            </span>
          </div>
          <div className="flex items-center gap-6">
            <FooterLink href="/support">Support</FooterLink>
            <FooterLink href="/privacy">Privacy</FooterLink>
            <FooterLink href="/terms">Terms of use</FooterLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
)

interface FooterLinkProps extends LinkProps {
  children: React.ReactNode
  target?: string
}

const FooterLink = ({ href, target, children }: FooterLinkProps) => (
  <Link href={href} target={target} className="hover:text-primary">
    {children}
  </Link>
)
