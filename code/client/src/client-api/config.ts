const port: string =  process.env.REACT_APP_PORT ? `:${process.env.REACT_APP_PORT}` : '';

export const config = {
    baseURL: `${window.location.protocol}//${window.location.hostname}${port}`,
    headers: {'X-Requested-With': 'XMLHttpRequest'},
    timeout: 8000,
};
