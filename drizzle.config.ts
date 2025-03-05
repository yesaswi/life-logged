import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

// Parse the database URL to extract credentials
const dbUrl = new URL(process.env.DATABASE_URL);
const host = dbUrl.hostname;
const user = dbUrl.username;
const password = dbUrl.password;
const database = dbUrl.pathname.substring(1); // Remove leading /
const ssl = dbUrl.searchParams.get("sslmode") === "require";

export default {
  schema: "./server/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    host,
    user,
    password,
    database,
    ssl
  },
} satisfies Config; 