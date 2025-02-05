import { v } from "convex/values"
import { mutation, query, QueryCtx } from "./_generated/server"

export const getUser = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    if (!args.userId) return null

    const user = await userById(ctx, args.userId)
    if (!user) return null

    return user
  },
})

export const syncUser = mutation({
  args: {
    userId: v.string(),
    email: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const existingUser = await userById(ctx, args.userId)

    if (!existingUser) {
      await ctx.db.insert("users", {
        userId: args.userId,
        email: args.email,
        name: args.name,
        isPro: false,
      })
    } else {
      await ctx.db.patch(existingUser._id, {
        ...existingUser,
        email: args.email,
        name: args.name,
      })
    }
  },
})

export const deleteUser = mutation({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const existingUser = await userById(ctx, args.userId)

    if (existingUser) {
      await ctx.db.delete(existingUser._id)
    }
  },
})

export const userById = async (ctx: QueryCtx, userId: string) =>
  await ctx.db
    .query("users")
    .withIndex("by_user_id", (q) => q.eq("userId", userId))
    .unique()
