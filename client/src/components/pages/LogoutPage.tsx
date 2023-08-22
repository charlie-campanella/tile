/**
 * @file components/pages/LogoutPage.tsx
 * @description Page for logging out
 */

/* Third Party Dependencies */
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOut } from '@fortawesome/free-solid-svg-icons'

/* Local Dependencies */
import Button from '../atoms/Button'
import Layout from '../organisms/Layout'

/* Component Definition */
const LogoutPage = () => {
    /* Component State */
    const navigate = useNavigate()
    /* Component Methods */
    const logout = function() {
        localStorage.removeItem('token');
        navigate('/login');
    }
    /* Component View */
    return (
        <Layout title={'Log Out'}>
            <div className='empty-state'>
                <FontAwesomeIcon className='icon' icon={faSignOut}/>
                <h2>Are you sure you want to log out?</h2>
                <p>Staying signed in is more convenient...</p>
                <Button label={'Log Out'} onClick={logout}/>
            </div>
        </Layout>
    )
}

export default LogoutPage