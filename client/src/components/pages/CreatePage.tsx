/**
 * @file components/pages/CreatePage.tsx
 * @description Page for creating a new tile
 */

/* Third Party Dependencies */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

/* Local Dependencies */
import Button from '../atoms/Button'
import Layout from '../organisms/Layout'

import TileService, { ITile } from '../../services/TileService'

/* Component Definition */
const CreatePage = () => {
    /* Component State */
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [label, setLabel] = useState('')
    const [description, setDescription] = useState('')

    /* Component Methods */
    const createTile = async function() {
            setLoading(true);
            const tile: ITile = { label, description }
            const created = await TileService.createTile(tile)
            if (!created) {
                alert('An error occurred while creating your tile');
                setLoading(false);
                return;
            }
            navigate('/')
            setLoading(false)
        }
    
    const onSubmit = (event: any) => {
        event.preventDefault()
        createTile()
    }

    /* Component View */
    return (
        <Layout title={'Create Tile'}>
            <div className='formWrapper'>
                <h1>Create Tile</h1>
                <p>
                    Tiles are micro-applications that run on your homepage.
                </p>
                <form onSubmit={onSubmit}>
                    <label>
                        Tile Label
                        <input 
                            type='text' 
                            name='label' 
                            value={label}
                            placeholder='e.g Clock' 
                            onChange={(e) => setLabel(e.target.value)} 
                            required
                            />
                    </label>
                    <label>
                        Tile Description
                        <textarea 
                            name='description' 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder='e.g Shows the current time, incrementing each second in real-time' 
                            required
                        />
                    </label>
                    <Button type='submit' label={'Submit'} isLoading={loading}/>
                </form>
                <p>
                    Code generation can take 30 or more seconds. Be patient!
                </p>
            </div>
        </Layout>
    )
}

export default CreatePage