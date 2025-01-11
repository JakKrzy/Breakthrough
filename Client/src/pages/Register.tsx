import React from 'react'
import UserForm from '../components/UserForm'
import { useNavigate } from 'react-router-dom'
import { useAlert } from '../context/AlertProvider'

const Register = () => {
  const navigate = useNavigate()
  const { showAlert } = useAlert()

  return (
    <UserForm header="Register" onSubmit={async (nick, password) => {
      try {
        const result = await fetch(`${import.meta.env.VITE_HOST}/api/User/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nickname: nick,
            password: password
          })
        }).then(res => res.json())
        showAlert(result.message)
        navigate("/login")
      } catch (error) {
        alert(error)
      }
    }} />
  )
}

export default Register