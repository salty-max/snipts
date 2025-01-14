import { config } from "dotenv"
import { type Config } from "drizzle-kit"

config({ path: ".env.local" })

export default {
  dialect: "postgresql",
  schema: "./src/schema.ts",
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
} satisfies Config
