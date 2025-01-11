import React from 'react'
import Header from './components/Header/Header'
import { Outlet } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'


const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default Layout