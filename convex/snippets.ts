import { ConvexError, v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { userById } from "./users"

export const getSnippets = query({
  args: {},
  handler: async (ctx) =>
    await ctx.db.query("snippets").order("desc").collect(),
})

export const isSnippetStarred = query({
  args: {
    snippetId: v.id("snippets"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) return false

    const star = await ctx.db
      .query("stars")
      .withIndex("by_user_id_and_snippet_id")
      .filter(
        (q) =>
          q.eq(q.field("userId"), identity.subject) &&
          q.eq(q.field("snippetId"), args.snippetId),
      )
      .unique()

    return !!star
  },
})

export const getSnippetStarCount = query({
  args: { snippetId: v.id("snippets") },
  handler: async (ctx, args) => {
    const stars = await ctx.db
      .query("stars")
      .withIndex("by_snippet_id", (q) => q.eq("snippetId", args.snippetId))
      .collect()

    return stars.length
  },
})

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
