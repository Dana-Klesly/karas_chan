import { drizzle as drizzleNeon } from "drizzle-orm/neon-http";
import { drizzle as drizzlePg } from "drizzle-orm/node-postgres";
import { env } from "../env";

const isCI = process.env.CI === "true";

export const db = isCI
    ? drizzlePg(env.DATABASE_URL, { casing: "snake_case" })
    : drizzleNeon(env.DATABASE_URL, { casing: "snake_case" });