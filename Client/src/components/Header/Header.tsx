import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom'
import { useUser } from '../../context/UserProvider'
import { useAlert } from '../../context/AlertProvider'

const Header = () => {
  const { userState: { isLoggedIn, nickname }, userDispatch } = useUser()
  const navlinkClasses = "me-2 p-1 fs-6 text-decoration-none text-light"
  const { showAlert } = useAlert()

  const logout = () => {
    userDispatch({ type: 'LOGOUT', payload: {}})
    showAlert("Logged out")
  }

  return (
    <Navbar expand="lg" bg="dark" variant="dark" collapseOnSelect>
        <Container>
            <Navbar.Brand>Breakthrough</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav"/>
            <Navbar.Collapse id="navbar-nav">
                <Nav className="me-auto">
                    <NavLink to="/" className={navlinkClasses}>Home</NavLink>
                    <NavLink to="/rules" className={navlinkClasses}>Rules</NavLink>
                    { isLoggedIn && <NavLink to="/rooms" className={navlinkClasses}>Rooms</NavLink> }
                </Nav>
                {
                    isLoggedIn
                    ? <Nav>
                        <NavLink to="/user" className={navlinkClasses}>{nickname}</NavLink>
                        <NavLink to="/" className={navlinkClasses} onClick={logout}>
                            Log out
                        </NavLink>
                    </Nav>
                    : <Nav>
                        <NavLink to="/login" className={navlinkClasses}>Log in</NavLink>
                        <NavLink to="/register" className={navlinkClasses}>Register</NavLink>
                    </Nav>
                }
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default Header