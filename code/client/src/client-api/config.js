const port = (process.env && process.env.PORT) ? `:${process.env.PORT}` : '';

export const config = {
  baseURL: !process.env.MOCHA_TEST && `${window.location.protocol}//${window.location.hostname}${port}`,
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  withCredentials: true,
  credentials: 'same-origin',
  timeout: 8000,
};
