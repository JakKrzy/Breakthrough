import React from 'react'
import UserForm from '../components/UserForm'
import { useNavigate } from 'react-router-dom'
import { useAlert } from '../context/AlertProvider'

const Login = () => {
  const navigate = useNavigate()
  const { showAlert } = useAlert()

  return (
    <UserForm header="Log in" onSubmit={async (nick, password) => {
      try {
        const result = await fetch(`${import.meta.env.VITE_HOST}/api/User/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nickname: nick,
            password: password
          })
        }).then(res => res.json())
        localStorage.setItem("jwt", result.accessToken)
        showAlert(result.message)
        navigate("/")
      } catch (error) {
        alert(error)
      }
    }} />
  )
}

export default Login