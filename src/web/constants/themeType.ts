export enum THEME_TYPE {
  DARK = 'dark',
  LIGHT = 'light',
}

export const DEFAULT_THEME = THEME_TYPE.LIGHT
export const AVAILABLE_THEMES = Object.values(THEME_TYPE)
export const isAvailableTheme = (theme: string): theme is THEME_TYPE =>
  AVAILABLE_THEMES.includes(theme as any)
