/* Third Party Dependencies */
import { BrowserRouter, Routes, Route } from 'react-router-dom'

/* Local Dependencies */
import HomePage from './components/pages/HomePage'
import CreatePage from './components/pages/CreatePage'
import LoginPage from './components/pages/LoginPage'
import LogoutPage from './components/pages/LogoutPage'
import RegisterPage from './components/pages/RegisterPage'

import ProtectedRoute from './components/atoms/ProtectedRoute'

/* Main App */
const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProtectedRoute children={<HomePage/>}/>}/>
                <Route path="/create" element={<ProtectedRoute children={<CreatePage/>}/>} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/logout" element={<LogoutPage/>} />
                <Route path="/register" element={<RegisterPage/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App