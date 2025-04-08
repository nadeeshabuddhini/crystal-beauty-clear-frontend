
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import AdminPage from './pages/adminPage'
import LoginPage from './pages/loginPage'

function App() {
 

  return (
    <BrowserRouter>
      <Routes path="/*">
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/*" element={<h1>404 not found</h1>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
