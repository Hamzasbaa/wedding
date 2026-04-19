// Validates required environment variables at startup with Zod.
// Any missing value fails fast with a clear error — better than a runtime surprise later.
import { z } from 'zod'

const envSchema = z.object({
  VITE_SUPABASE_URL: z.string().url(),
  VITE_SUPABASE_PUBLISHABLE_KEY: z.string().min(1),
})

const parsed = envSchema.safeParse(import.meta.env)

if (!parsed.success) {
  const issues = parsed.error.issues.map((i) => `  - ${i.path.join('.')}: ${i.message}`).join('\n')
  throw new Error(`Missing or invalid environment variables:\n${issues}\nCheck .env.local.`)
}

export const env = parsed.data
