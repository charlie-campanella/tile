/**
 * @file components/molecules/EmptyState.tsx
 * @description `EmptyState` component 
 */

/* Third Party Dependencies */
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from '@fortawesome/free-solid-svg-icons'

/* Local Dependencies */
import Button from '../atoms/Button'

const EmptyState = () => {
    const navigate = useNavigate()
    return (
        <div className='empty-state'>
            <FontAwesomeIcon className='icon' icon={faFolder} />
            <h2>It's a little empty here...</h2>
            <p>Click the button below to create your first tile!</p>
            <Button label='Create Tile' onClick={() => navigate('/create')} />
        </div>
    )
}

export default EmptyState