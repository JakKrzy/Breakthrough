import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Button from 'react-bootstrap/Button'
import { NavLink } from 'react-router-dom'
import { useAlert } from '../context/AlertProvider'
import { useUser } from '../context/UserProvider'
import { useNavigate } from 'react-router-dom'

const LoginAnonymous = () => {
  const [nickName, setNickName] = useState("")
  const { showAlert } = useAlert()
  const { userDispatch } = useUser()
  const navigate = useNavigate()

  const onSubmit = async () => {
    try {
      const result = await fetch(`${import.meta.env.VITE_HOST}/api/User/loginAnon`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nickname: nickName
        })
      })
      const resJson = await result.json()
      if (!result.ok)
        throw resJson        

      sessionStorage.setItem("accessToken", resJson.tokens.accessToken)
      sessionStorage.setItem("refreshToken", resJson.tokens.refreshToken)

      userDispatch({ type: "LOGINANON", payload: { nickname: nickName } })

      showAlert(resJson.message)
      navigate("/rooms")
    } catch (error: any) {
      showAlert(error.message)
    }
  }

  return (
    <div className="container d-flex flex-row justify-content-center p-3">
        <Form className="mt-3 border rounded p-3" onSubmit={e => { e.preventDefault(); onSubmit() }}>
            <h3>Log in as anonymous user</h3>
            <Form.Group className="mb-3" controlId="formGroupNickname">
                <FloatingLabel controlId="floatingNicknameLabel" label="Nickname">
                    <Form.Control type="text" placeholder="Nickname" autoFocus
                        value={nickName} onChange={e => setNickName(_ => e.target.value)}/>
                </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupSubmit">
                <Button type="submit" variant="primary">Log in</Button>
            </Form.Group>
            <div className="d-flex flex-row gap-2">
                or
                <NavLink to="/register">
                    register a new account
                </NavLink>
            </div>
        </Form>
    </div>
  )
}

export default LoginAnonymous