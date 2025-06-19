
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import AdminPage from './pages/adminPage'
import LoginPage from './pages/loginPage'
import { Toaster } from 'react-hot-toast'
import TestingPage from './pages/testing'
import RegisterPage from './pages/client/register'
import HomePage from './pages/homePage'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ForgetPassword from './pages/client/forgetPassword'

function App() {
 

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <BrowserRouter>
      <Toaster position='top-right'/>
      <Routes path="/*">
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="forget" element={<ForgetPassword/>} />
        <Route path="/*" element={<HomePage/>} />
      </Routes>
    </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
