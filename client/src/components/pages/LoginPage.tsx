/**
 * @file components/pages/LoginPage.js
 * @description Login page component
 */

/* Third Party Dependencies */
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

/* Local Dependencies */
import Button from '../../components/atoms/Button'
import Layout from '../../components/organisms/Layout'
import UserService from '@/services/UserService'

const LoginPage = () => {

    /* Component State */
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    /* Component Methods */
    const loginUser = async function() {
        setLoading(true);
        const loggedIn = await UserService.login(email, password)
        if (loggedIn) {
            navigate('/')
        } else {
            alert('There was an error logging in, please try again')
        }
        setLoading(false)
    }

    const onSubmit = (event: any) => {
        event.preventDefault()
        loginUser()
    }

    /* Component View */
    return (
        <Layout title={'Log In'}>
            <div className='formWrapper'>
                <h1>Sign In to Tile</h1>
                <form onSubmit={onSubmit}>
                    <label>
                        Email Address
                        <input type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    </label>
                    <label>
                        Password
                        <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    </label>
                    <Button type='submit' label={'Log In'} isLoading={loading}/>
                </form>
                <p>Don't have an account? <Link to='/register'>Register</Link></p>
            </div>
        </Layout>
    )
}

export default LoginPage