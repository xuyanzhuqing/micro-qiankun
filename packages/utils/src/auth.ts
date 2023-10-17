export const AUTH_HEADER_KEY = 'Authorization'

export const getAuthorization = () => localStorage.getItem(AUTH_HEADER_KEY)

export const setAuthorization = (content: string) => localStorage.setItem(AUTH_HEADER_KEY, content)