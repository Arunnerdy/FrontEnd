import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import { BrowserRouter,Routes,Router,Route } from 'react-router-dom'

function App() {

  return (
    <>
     
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Login />} />
      </Routes>
    
    </>
  )
}

export default App
