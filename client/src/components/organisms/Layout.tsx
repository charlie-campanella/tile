/**
 * @file components/organisms/Layout.tsx
 * @description This file contains the master layout for the application
 */

/* Third Party Dependencies */
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

/* Module Methods */

// Get the current date and time
const getDateTime = () => {
    const date = new Date()
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
}

// Check if the user is logged in
const isLoggedIn = () => {
    return !!localStorage.getItem('token')
}

/* Component Definition */
const Layout = (props: any) => {
    const { children, title } = props

    const [links, setLinks] = useState([
        { href: '/login', label: 'Login' },
        { href: '/register', label: 'Register' }
    ])

    useEffect(() => {
        if (isLoggedIn()) {
            setLinks([
                { href: '/', label: 'Home' },
                { href: '/create', label: 'Create Tile' },
                { href: '/logout', label: 'Logout' }
            ])
        }
    }, [])

    return (
        <div className='layout'>
            <div className='header'>
                <img className='logo' src='logo.png' onClick={() => window.location.href = '/'}/>
                <h3 className='title'>{title}</h3>
                <div className='navigation'>
                    <ul>
                        {links.map((link, index) => {
                            return (
                                <li key={index}>
                                    <Link to={link.href}>{link.label}</Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <div className='content'>{children}</div>
            <div className='footer'>
                <p>Rendered at {getDateTime()}</p>
            </div>
        </div>
    )
}

export default Layout