import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AlertProvider } from './context/AlertProvider'
import UserProvider from './context/UserProvider'
import Layout from './Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Play from './pages/Play'
import Rules from './pages/Rules'
import LoginAnonymous from './pages/LoginAnonymous'
import Rooms from './pages/Rooms'

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
              <Route path="play" element={<Play />} />
              <Route path="rules" element={<Rules />} />
              <Route path="loginAnonymous" element={<LoginAnonymous />} />
              <Route path="rooms" element={<Rooms />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AlertProvider>
    </UserProvider>
  )
}

export default App
