import Header from './components/Header/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AlertProvider } from './context/AlertProvider'
import UserProvider from './context/UserProvider'
import Layout from './Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <UserProvider>
      <AlertProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AlertProvider>
    </UserProvider>
  )
}

export default App
