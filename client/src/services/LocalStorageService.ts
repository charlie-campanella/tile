/**
 * @file services/LocalStorageService.ts
 * @descr LocalStorage CRUD operations
 */

/* Constants */
const TOKEN_KEY = 'token'

class LocalStorageService {
    setToken(token: string) {
        localStorage.setItem(TOKEN_KEY, token)
    }
    getToken(): string {
        return localStorage.getItem(TOKEN_KEY) || ''
    }
    removeToken() {
        localStorage.removeItem(TOKEN_KEY)
    }
}

export default new LocalStorageService()