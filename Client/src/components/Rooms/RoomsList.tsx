import React, { useEffect, useState } from 'react'
import * as SignalR from '@microsoft/signalr'
import Container from 'react-bootstrap/Container'
import { NavLink } from 'react-router-dom'
import Pawn from '../../assets/BlackPawn.svg'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'

type Room = { id: number, name: string }

const RoomsList = () => {
  const [connection, setConnection] = useState<SignalR.HubConnection | null>(null)
  const [rooms, setRooms] = useState<Room[] | null>(null)
  const navigate = useNavigate()
  
  useEffect(() => {
    const newConnection = new SignalR.HubConnectionBuilder()
        .withUrl(
          `${import.meta.env.VITE_HOST}/roomsHub`,
          { accessTokenFactory: () => sessionStorage.getItem("accessToken") || "" })
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

  const createRoom = async () => {
    await connection?.invoke("CreateRoom")
    navigate("/play")
  }

  const enterRoom = async (id: number) => {
    const jwt = sessionStorage.getItem("accessToken")
    await connection?.invoke("JoinRoom", jwt, id)
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
                        <NavLink to="/play" onClick={() => enterRoom(room.id)}>Enter</NavLink>
                    </div>
                )
            }
        </div>
    </Container>
  )
}

export default RoomsList