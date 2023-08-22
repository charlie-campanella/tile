/**
 * @file components/pages/HomePage.tsx
 * @description Page for displaying all tiles
 */

/* Third Party Dependencies */
import { useState, useEffect } from 'react'

/* Local Dependencies */

// Components
import Tile from '../atoms/Tile'
import Layout from '../organisms/Layout'
import EmptyState from '../molecules/EmptyState'
import LoadingState from '../molecules/LoadingState'

// Services
import TileService, { ITile } from '../../services/TileService'

const ReadyState = (props: any) => {
    const { tiles, onDelete } = props;

    const renderTiles = (tiles: any) => {
        return (
            <div className='tile-grid'>
                {tiles.map((tile: any) => (
                    <Tile
                        key={tile._id}
                        id={tile._id}
                        label={tile.label}
                        javascript={tile.javascript}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        )
    }

    return (
        <div className='content'>
            {tiles.length === 0 
                ? <EmptyState/> 
                : renderTiles(tiles)
            }
        </div>
    )
}

const HomePage = () => {

    /* Component State */
    const [loading, setLoading] = useState(true)
    const [tiles, setTiles] = useState<ITile[]>([])

    /* Component Lifecycle */
    useEffect(() => {
        getTiles()
    }, [])

    /* Component Functions */
    const getTiles = async () => {
        setLoading(true)
        const tiles = await TileService.getTiles()
        setTiles(tiles)
        setLoading(false)
    }

    const handleDelete = async (id: any) => {
        setLoading(true)
        const deleted = await TileService.deleteTile(id)
        if (deleted) {
            getTiles()
        }
    }

    /* Component View */
    return (
        <Layout title={'Home'}>
            {loading ? <LoadingState/> : <ReadyState tiles={tiles} onDelete={handleDelete}/>}
        </Layout>
    )
}

export default HomePage