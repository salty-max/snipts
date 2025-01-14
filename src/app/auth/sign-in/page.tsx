"use client"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/ui/icons"
import { cn } from "@/lib/utils"
import { redirect } from "next/navigation"

export default function SignInPage() {
  return (
    <form className="grid w-full grow items-center px-4 sm:justify-center">
      <Card className="w-full sm:w-96">
        <CardHeader>
          <CardTitle>Sign in to Snipts</CardTitle>
          <CardDescription>
            Welcome back! Please sign in to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-y-4">
          <div className="grid grid-cols-2 gap-x-4">
            <Button
              size="sm"
              variant="outline"
              type="button"
              onClick={() =>
                signIn("github", {
                  redirect: true,
                  redirectTo: "/",
                })
              }
            >
              <Icons.Github className="mr-2 size-4" />
              GitHub
            </Button>
            <Button
              size="sm"
              variant="outline"
              type="button"
              onClick={() =>
                signIn("google", {
                  redirect: true,
                  redirectTo: "/",
                })
              }
            >
              <Icons.Google className="mr-2 size-4" />
              Google
            </Button>
          </div>
          <p className="flex items-center gap-x-3 text-sm text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
            or
          </p>
          <div className="flex space-y-2">
            <Label>Email address</Label>
            <Input type="email" name="email" />
          </div>
          <div className="flex space-y-2">
            <Label>Pasword</Label>
            <Input type="password" name="password" />
          </div>
        </CardContent>
        <CardFooter>
          <div className="grid w-full gap-y-4">
            <Button>Login</Button>

            <Button variant="link" size="sm" asChild>
              Don&apos;t have an account? Sign up
            </Button>
          </div>
        </CardFooter>
      </Card>
    </form>
  )
}
