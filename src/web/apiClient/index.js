import axios from 'axios'

import { API } from 'shared/constants'

import { CONFIG } from '../constants'

const port = CONFIG.API_PORT ? `:${CONFIG.API_PORT}` : ''
const host = !CONFIG.MOCHA_TEST && `${window.location.protocol}//${window.location.hostname}${port}`

export const config = {
  baseURL: `${host}/${API.API_PREFIX}`,
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  withCredentials: true,
  credentials: 'same-origin',
  timeout: 8000,
}

export const apiClient = axios.create(config)
