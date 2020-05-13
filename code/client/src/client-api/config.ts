const port: string = process.env.PORT ? `:${process.env.PORT}` : '';

export const config = {
  baseURL: `${window.location.protocol}//${window.location.hostname}${port}`,
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  timeout: 8000,
};
