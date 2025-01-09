import { httpRouter } from "convex/server"
import { httpAction } from "./_generated/server"
import { Webhook } from "svix"
import { WebhookEvent } from "@clerk/nextjs/server"
import { api } from "./_generated/api"

const http = httpRouter()

http.route({
  path: "/clerk-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET
    if (!webhookSecret) {
      throw new Error("Missing CLERK_WEBHOOK_SECRET environment variable")
    }

    const svixId = request.headers.get("svix-id")
    const svixSignature = request.headers.get("svix-signature")
    const svixTimestamp = request.headers.get("svix-timestamp")

    if (!svixId || !svixSignature || !svixTimestamp) {
      return new Response("Error occured -- no svix headers", {
        status: 400,
      })
    }

    const payload = await request.json()
    const body = JSON.stringify(payload)

    const wh = new Webhook(webhookSecret)
    let evt: WebhookEvent

    try {
      evt = wh.verify(body, {
        "svix-id": svixId,
        "svix-timestamp": svixTimestamp,
        "svix-signature": svixSignature,
      }) as WebhookEvent
    } catch (err) {
      console.error("Error verifying webhook:", err)
      return new Response("Error occured", { status: 400 })
    }

    const eventType = evt.type
    if (eventType === "user.created") {
      // Save the user to convex
      const { id, email_addresses, first_name, last_name } = evt.data
      const email = email_addresses[0].email_address
      const name = `${first_name || ""} ${last_name || ""}`.trim()

      try {
        await ctx.runMutation(api.users.syncUser, {
          userId: id,
          email,
          name,
        })
      } catch (err) {
        console.error("Error creating user: ", err)
        return new Response("Error creating user", { status: 500 })
      }
    }

    if (eventType === "user.deleted") {
      // Delete the user from convex
      const { id } = evt.data

      try {
        await ctx.runMutation(api.users.deleteUser, {
          userId: id || "",
        })
      } catch (err) {
        console.error("Error deleting user: ", err)
        return new Response("Error deleting user", { status: 500 })
      }
    }

    return new Response("Webhook processed successfully", { status: 200 })
  }),
})

export default http
