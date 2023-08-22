/**
 * @file UserService.ts
 * @description User CRUD operations
 */

/* Local Dependencies */
import LocalStorageService from "./LocalStorageService"

/* Constants */
const ROOT_URL = 'http://localhost:3000'

class UserService {

    async create(email: string, password: string): Promise<boolean> {
        const response = await fetch(`${ROOT_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })
        return response.status === 200
    }

    async login(email: string, password: string): Promise<boolean> {
        const response = await fetch(`${ROOT_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })
        if (response.status !== 200) return false
        const { token } = await response.json()
        LocalStorageService.setToken(token)
        return true
    }
        
}

export default new UserService();
