import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Button from 'react-bootstrap/Button'
import { NavLink } from 'react-router-dom'

type userFormParams = {
    header: String,
    onSubmit: (nick: String, pwd: String) => void
}

const UserForm = ({ header, onSubmit }: userFormParams) => {
  const [nickName, setNickName] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="container d-flex flex-row justify-content-center p-3">
        <Form className="mt-3 border rounded p-3" onSubmit={e => { e.preventDefault(); onSubmit(nickName, password) }}>
            <h3>{header}</h3>
            <Form.Group className="mb-3" controlId="formGroupNickname">
                <FloatingLabel controlId="floatingNicknameLabel" label="Nickname">
                    <Form.Control type="text" placeholder="Nickname" autoFocus
                        value={nickName} onChange={e => setNickName(_ => e.target.value)}/>
                </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
                <FloatingLabel controlId="floatingPasswordLabel" label="Password">
                    <Form.Control type="password" placeholder="Password"
                        value={password} onChange={e => setPassword(_ => e.target.value)}/>
                </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupSubmit">
                <Button type="submit" variant="primary">{header}</Button>
            </Form.Group>
            <div className="d-flex flex-row gap-2">
                or
                <NavLink to="/loginAnonymous">
                    Log in without creating an account
                </NavLink>
            </div>
        </Form>
    </div>
  )
}

export default UserForm