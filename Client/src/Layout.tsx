import { useEffect } from 'react'
import Header from './components/Header/Header'
import { Outlet } from 'react-router-dom'
import { useUser } from './context/UserProvider'


const Layout = () => {
  const { userState: { connection } } = useUser()
  useEffect(() => {
    if (!connection) return;
    connection.start()
  }, [connection])

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default Layout