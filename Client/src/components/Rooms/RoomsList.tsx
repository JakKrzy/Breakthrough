import React, { useEffect, useState } from 'react'
import * as SignalR from '@microsoft/signalr'
import Container from 'react-bootstrap/Container'
import { NavLink } from 'react-router-dom'
import Pawn from '../../assets/BlackPawn.svg'
import Button from 'react-bootstrap/Button'

type Room = { name: string }

const RoomsList = () => {
  const [connection, setConnection] = useState<SignalR.HubConnection | null>(null)
  const [rooms, setRooms] = useState<Room[] | null>(null)
  
  useEffect(() => {
    const newConnection = new SignalR.HubConnectionBuilder()
        .withUrl(`${import.meta.env.VITE_HOST}/roomsHub`)
        .withAutomaticReconnect()
        .build()

    setConnection(newConnection)
  }, [])

  useEffect(() => {
    if (!connection) return
    connection.start()
        .then(() => {
            connection.on("ReceiveRooms", (rooms) => setRooms(rooms))
        })
  }, [connection])

  const createRoom = () => {
    const jwt = localStorage.getItem("accessToken")
    connection?.invoke("CreateRoom", jwt)
  }

  return (
    <Container className="mt-3">
        <div className="mb-3 d-flex align-items-center justify-content-between">
            <h1>Rooms</h1>
            <Button onClick={createRoom}>New room</Button>
        </div>
        <div>
            {
                rooms?.length === 0
                ? <p>No rooms available!</p>
                : rooms?.map((room: Room, index) => 
                    <div 
                        className="border rounded bg-light p-2 d-flex align-items-center justify-content-around w-50 mb-1"
                        key={index}
                    >
                        <img src={Pawn} alt="Pawn" className="pawn-icon" />
                        {room.name}
                        <NavLink to="/">Enter</NavLink>
                    </div>
                )
            }
        </div>
    </Container>
  )
}

export default RoomsList