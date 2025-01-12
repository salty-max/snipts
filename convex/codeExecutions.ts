import { ConvexError, v } from "convex/values"
import { mutation } from "./_generated/server"
import { userById } from "./users"

export const saveExecution = mutation({
  args: {
    language: v.string(),
    code: v.string(),
    output: v.optional(v.string()),
    error: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new ConvexError("Not authenticated")

    const user = await userById(ctx, identity.subject)
    if (!user) {
      throw new ConvexError("User not found")
    }

    // Check pro status
    if (!user?.isPro && args.language !== "javascript") {
      throw new ConvexError("Pro subscription required to use this language")
    }

    await ctx.db.insert("codeExecutions", {
      ...args,
      userId: user._id,
    })
  },
})
