import dotenv from 'dotenv'

dotenv.config()

export const DATABASE_URL = process.env.DATABASE_URL ?? ''

export const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY ?? null
export const SENDGRID_EMAIL = process.env.SENDGRID_EMAIL ?? null
export const BACKLINK_URL = process.env.BACKLINK_URL ?? `http://localhost${process.env.PORT ? `:${process.env.PORT}` : ''}`
