import React from 'react'
import Board from '../components/Board/Board'
import { useUser } from '../context/UserProvider'
import Container from 'react-bootstrap/Container'


const Play = () => {
  const { userState: { isLoggedIn } } = useUser()

  if (isLoggedIn)
    return (
      <Board />
    )
  else return (
    <Container>
      <p>To play please log in</p>
    </Container>
  )
}

export default Play