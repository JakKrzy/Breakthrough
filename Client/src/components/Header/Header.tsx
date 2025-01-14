import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom'
import { useUser } from '../../context/UserProvider'

const Header = () => {
  const { userState } = useUser()
  const navlinkClasses = "me-2 p-1 fs-6 text-decoration-none text-light"

  return (
    <Navbar expand="lg" bg="dark" variant="dark" collapseOnSelect>
        <Container>
            <Navbar.Brand>Breakthrough</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav"/>
            <Navbar.Collapse id="navbar-nav">
                <Nav className="me-auto">
                    <NavLink to="/" className={navlinkClasses}>Home</NavLink>
                    <NavLink to="/play" className={navlinkClasses}>Play</NavLink>
                    <NavLink to="/rules" className={navlinkClasses}>Rules</NavLink>
                    <NavLink to="/rooms" className={navlinkClasses}>Rooms</NavLink>
                </Nav>
                {
                    userState.isLoggedIn
                    ? <Nav><NavLink to="/user" className={navlinkClasses}>{userState.nickname}</NavLink></Nav>
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