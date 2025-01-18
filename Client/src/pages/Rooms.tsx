import React from 'react'
import RoomsList from '../components/Rooms/RoomsList'
import { useUser } from '../context/UserProvider'
import Container from 'react-bootstrap/Container'


const Rooms = () => {
  const { userState: { isLoggedIn }} = useUser()

  if (isLoggedIn) return (
    <RoomsList />
  )
  else return (
    <Container>
      <p>Please log in to view available rooms</p>
    </Container>
  )
}

export default Rooms