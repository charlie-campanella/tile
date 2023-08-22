/**
 * @file TileService.ts
 * @description Tile CRUD operations
 */

/* Local Dependencies */
import LocalStorageService from "./LocalStorageService"

/* Constants */
const ROOT_URL = 'http://localhost:3000'

/* Types */
export type ITile = {
    _id?: string
    userId?: string
    label: string,
    description: string,
    javascript?: string,
}

class TileService {

    async getTiles(): Promise<ITile[]> {
        const response = await fetch(`${ROOT_URL}/tiles`, {
            method: 'GET',
            headers: {
                'Authorization': LocalStorageService.getToken()
            }
        })
        const json = await response.json()
        return json?.tiles || []
    }
    
    async deleteTile(id: string): Promise<boolean> {
        const response = await fetch(`${ROOT_URL}/tiles/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': LocalStorageService.getToken()
            }
        })
        return response.status === 200
    }

    async createTile(tile: ITile): Promise<boolean> {
        const response = await fetch(`${ROOT_URL}/tiles`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': LocalStorageService.getToken()
            },
            body: JSON.stringify({ label: tile.label, description: tile.description })
        })
        return response.status === 200
    }
    
}

export default new TileService();