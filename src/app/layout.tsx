import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignOutButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { LogOutIcon } from "lucide-react"
import { ConvexClientProvider } from "@/components/providers/convex-client-provider"
import { Footer } from "@/components/footer"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Snipts",
  description: "Generated by create next app",
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <ConvexClientProvider>
      <html lang="en">
        <body
          className={`dark ${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        >
          {children}
          <Footer />
        </body>
      </html>
    </ConvexClientProvider>
  )
}

export default RootLayout
