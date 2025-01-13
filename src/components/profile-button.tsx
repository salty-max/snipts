"use client"

import { SignedOut, SignInButton } from "@clerk/clerk-react"
import { UserButton } from "@clerk/nextjs"
import { UserIcon } from "lucide-react"

export const ProfileButton = () => {
  return (
    <>
      <UserButton>
        <UserButton.MenuItems>
          <UserButton.Link
            label="Profile"
            labelIcon={<UserIcon className="size-4" />}
            href="/profile"
          />
        </UserButton.MenuItems>
      </UserButton>

      <SignedOut>
        <SignInButton />
      </SignedOut>
    </>
  )
}
