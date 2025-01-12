import { ConvexError, v } from "convex/values"
import { mutation } from "./_generated/server"
import { userById } from "./users"

export const createSnippet = mutation({
  args: {
    title: v.string(),
    language: v.string(),
    code: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new ConvexError("Not authenticated")
    }

    const user = await userById(ctx, identity.subject)
    if (!user) {
      throw new ConvexError("User not found")
    }

    const snippetId = await ctx.db.insert("snippets", {
      ...args,
      userId: user._id,
      username: user.name,
    })

    return snippetId
  },
})
