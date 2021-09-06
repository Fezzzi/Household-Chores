import dotenv from 'dotenv'

dotenv.config()

export const API_PORT = process.env.API_PORT ? Number(process.env.API_PORT) : 8080
export const DEBUG = Boolean(process.env.DEBUG)
export const LOGS_PATH = process.env.LOGS_PATH ?? 'logs'
export const UPLOADS_PATH = process.env.UPLOADS_PATH ?? 'uploads'

const defaultSsl = process.env.HEROKU_APP_NAME != null ? 'true' : 'false'
export const DATABASE_SSL = (process.env.DATABASE_SSL ?? defaultSsl) === 'true'
export const DATABASE_URL = process.env.DATABASE_URL ?? ''
export const SESSION_SECRET = process.env.SESSION_SECRET ?? 'test'

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID ?? ''
export const FACEBOOK_SECRET = process.env.FB_SECRET ?? ''

export const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY ?? null
export const SENDGRID_EMAIL = process.env.SENDGRID_EMAIL ?? null
export const BACKLINK_URL = process.env.BACKLINK_URL ?? `http://localhost${process.env.API_PORT ? `:${process.env.API_PORT}` : ''}`

export const GITHUB_USERNAME = process.env.GITHUB_USERNAME
export const GITHUB_TOKEN = process.env.GITHUB_TOKEN
