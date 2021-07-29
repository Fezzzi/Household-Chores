const port = (process.env && process.env.API_PORT) ? `:${process.env.API_PORT}` : ''

export const config = {
  baseURL: !process.env.MOCHA_TEST && `${window.location.protocol}//${window.location.hostname}${port}`,
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  withCredentials: true,
  credentials: 'same-origin',
  timeout: 8000,
}
