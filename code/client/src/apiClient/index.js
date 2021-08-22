import axios from 'axios'

import { API } from 'shared/constants'

const port = (process.env && process.env.API_PORT) ? `:${process.env.API_PORT}` : ''
const host = !process.env.MOCHA_TEST && `${window.location.protocol}//${window.location.hostname}${port}`

export const config = {
  baseURL: `${host}/${API.API_PREFIX}`,
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  withCredentials: true,
  credentials: 'same-origin',
  timeout: 8000,
}

export const apiClient = axios.create(config)
