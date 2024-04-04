import { setCookie } from 'cookies-next'

export function logout() {
    setCookie('jwt', '')
}