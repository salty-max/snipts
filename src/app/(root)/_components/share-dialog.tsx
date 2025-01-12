"use client"

import { useCodeEditorStore } from "@/store/use-code-editor-store"
import { useMutation } from "convex/react"
import { useState } from "react"
import { api } from "../../../../convex/_generated/api"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Loader2Icon, ShareIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

export const ShareDialog = () => {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [isSharing, setIsSharing] = useState(false)
  const { language, getCode } = useCodeEditorStore()
  const { toast } = useToast()

  const createSnippet = useMutation(api.snippets.createSnippet)

  const handleShare = async () => {
    setIsSharing(true)
    try {
      await createSnippet({
        title,
        language,
        code: getCode(),
      })
      toast({
        title: "Snippet shared successfully",
      })
      setTitle("")
      setOpen(false)
    } catch (err) {
      console.error("Error creating snippet:", err)
      toast({
        title: "Error creating snippet",
        variant: "destructive",
      })
    } finally {
      setIsSharing(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button>
          <ShareIcon className="size-4" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share your snippet</DialogTitle>
        </DialogHeader>
        <form action={handleShare}>
          <div className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4 py-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                placeholder="My awesome code"
                required
                className="col-span-3"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button
                variant="ghost"
                type="reset"
                onClick={() => setTitle("")}
                disabled={isSharing}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSharing}>
                {isSharing ? (
                  <>
                    <Loader2Icon className="size-4 animate-pulse" />
                    Sharing...
                  </>
                ) : (
                  "Share"
                )}
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
