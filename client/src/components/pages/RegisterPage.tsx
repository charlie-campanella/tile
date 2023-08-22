/**
 * @file components/pages/RegisterPage.tsx
 * @description Registration page
 */

/* Third Party Dependencies */
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

/* Local Dependencies */

// Components
import Button from '../atoms/Button'
import Layout from '../organisms/Layout'

// Services
import UserService from '../../services/UserService'

const RegisterPage = () => {

    /* Component State */
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)

    /* Component Methods */
    const registerUser = async () => {
        setLoading(true)
        const created = await UserService.create(email, password)
        if (created) {
            alert('Account created successfully, you will now be redirected to the login page')
            navigate('/login')
        } else {
            alert('There was an error creating your account, please try again')
        }
        setLoading(false)
    }

    const onSubmit = (event: any) => {
        event.preventDefault()
        if (password !== confirmPassword) {
            alert('Passwords do not match')
            return;
        }
        registerUser()
    }

    /* Component View */
    return (
        <Layout title={'Log In'}>
            <div className='formWrapper'>
                <h1>Create an Account</h1>
                <form onSubmit={onSubmit}>
                    <label>
                        Email Address
                        <input type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    </label>
                    <label>
                        Password
                        <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    </label>
                    <label>
                        Confirm Password
                        <input type='password' name='confirmPassword' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
                    </label>
                    <Button type='submit' label={'Register'} isLoading={loading}/>
                </form>
                <p>Already have an account? <Link to='/login'>Log In</Link></p>
            </div>
        </Layout>
    )
}

export default RegisterPage
