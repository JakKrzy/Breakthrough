import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'
import { useAlert } from '../../context/AlertProvider'

type GameInfo = {
    nickname: string,
    date: string
}

type UserType = {
    nickname: string,
    lostGames: GameInfo[],
    wonGames: GameInfo[]
}

const UserInfo = () => {
  const [user, setUser] = useState<UserType | undefined>(undefined)
  const { showAlert } = useAlert()

  useEffect(() => {
    const fetchData = async () => {
        try {
            const result = await fetch(`${import.meta.env.VITE_HOST}/api/user/info`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem("accessToken")}`
                }
            })
            const resJson = await result.json()
            if (!result.ok) throw resJson

            console.log(resJson)
            setUser(resJson)
        } catch (error: any) {
            showAlert(error.message)
        }
    }

    fetchData()
  }, [])

  return (
    <Container className="mt-3">
        <div className='d-flex flex-row align-items-center justify-content-between'>
            <h1>{user === undefined ? "User profile" : user.nickname}</h1>
            <h3>{user != undefined && `Won to lost ratio: ${user.wonGames.length}/${user.lostGames.length}`}</h3>
        </div>
        <Row>
            <Col>
                <h3>Won games</h3>
                <Stack gap={3}>
                    { user != undefined &&
                        user.wonGames.map((g, index) => {
                            const date = new Date(Date.parse(g.date))
                            const nick = g.nickname == null ? "Anonynymous user" : g.nickname
                            return ( 
                            <div 
                                className="border rounded bg-success p-2 d-flex align-items-center justify-content-around text-light"
                                key={index}
                            >
                                <div>Vs. {nick}</div>
                                <div>{`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`}</div>
                            </div>
                        )})
                    }
                </Stack>
            </Col>
            <Col>
                <h3>Lost games</h3>
                <Stack gap={3}>
                    { user != undefined &&
                        user.lostGames.map((g, index) => {
                            const date = new Date(Date.parse(g.date))
                            const nick = g.nickname == null ? "Anonynymous user" : g.nickname
                            return ( 
                            <div 
                                className="border rounded bg-danger p-2 d-flex align-items-center justify-content-around text-light"
                                key={index}
                            >
                                <div>Vs. {nick}</div>
                                <div>{`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`}</div>
                            </div>
                        )})
                    }
                </Stack>
            </Col>
        </Row>
    </Container>
  )
}

export default UserInfo