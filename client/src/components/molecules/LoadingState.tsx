/**
 * @file components/molecules/LoadingState.tsx
 * @description `LoadingState` component 
 */

/* Third Party Dependencies */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const LoadingState = () => {
    return (
        <div className='empty-state'>
            <FontAwesomeIcon className='icon' icon={faSpinner} spin={true} />
        </div>
    )
}

export default LoadingState