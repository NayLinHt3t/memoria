import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  HOST: z.string().default("0.0.0.0"),
  TELEGRAM_BOT_TOKEN: z.string().min(1, "TELEGRAM_BOT_TOKEN is required"), // Ensure the Telegram bot token is provided
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

export const config = envSchema.parse(process.env);
