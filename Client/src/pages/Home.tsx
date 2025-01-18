import React from 'react'
import Container from 'react-bootstrap/Container'
import { NavLink } from 'react-router-dom'

const Home = () => {
  return (
    <Container className="mt-3">
      <h1>Welcome to Breakthrough</h1>
      <p>To view available rooms and play please <NavLink to="/login">log in</NavLink>.</p>
      <p>While not logged in You can check out the <NavLink to="/rules">rules</NavLink>.</p>
    </Container>
  )
}

export default Home