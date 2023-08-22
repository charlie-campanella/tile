/* Third Party Dependencies */
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = (props: any) => {
    const { children } = props
    const navigate = useNavigate()
    const isLoggedIn = () => {
        return !!localStorage.getItem('token')
    }
    useEffect(() => {
        if (!isLoggedIn()) {
            navigate('/login')
        }
    }, [])
    return children
}

export default ProtectedRoute