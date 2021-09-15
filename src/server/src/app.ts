import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import createSession from 'express-pg-session'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'

import { API } from 'shared/constants'

import apiRouter from './actions/apiRouter'
import { Logger } from './helpers/logger'
import { CONFIG, LOGS } from './constants'

// Initialize the server
const app = express()

// Get data from raw HTTP requests and json bodies to request object
app.use(bodyParser.json({ limit: '3mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '3mb' }))

// Initialize cookie-parser to allow us access the cookies stored in the browser.
app.use(cookieParser())

// Initialize session store and session middleware
const PGStore = createSession(session)
const sessionStore = new PGStore({ conString: CONFIG.DATABASE_URL })
const YEAR_MILLISECONDS = 31540000000

app.use(session({
  store: sessionStore,
  name: 'user_sid',
  secret: CONFIG.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: YEAR_MILLISECONDS,
    expires: (() => {
      const date = new Date()
      date.setTime(date.getTime() + YEAR_MILLISECONDS)
      return date
    })(),
  },
}))

// Setup access logging
app.use(morgan(':remote-addr - :remote-user ":method :url" :status :response-time ms', {
  stream: {
    write: (str: string) => Logger(LOGS.ACCESS_LOG, str),
  },
}))

// Setup CORS policy
app.use(cors(
  CONFIG.DEBUG
    ? {
      origin: `http://localhost:${CONFIG.API_PORT === 8080 ? 8081 : 8080}`,
      credentials: true,
      optionsSuccessStatus: 200,
    }
    : {}
))

// Serve static assets
app.use('/', express.static(path.resolve('./build')))
app.use('/static', express.static(path.resolve('./static')))
app.use('/uploads', express.static(path.resolve('./uploads')))

// Checks if user's cookie is still saved in the browser without associated user, then clears the cookie
app.use((req: any, res, next) => {
  if (req.cookies.user_sid && (req.session && !req.session.userId)) {
    res.clearCookie('user_sid')
  }
  next()
})

// Setup API routing
app.use(`/${API.API_PREFIX}`, apiRouter())

export default app
