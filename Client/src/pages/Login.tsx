import React from 'react'
import UserForm from '../components/UserForm'
import { useNavigate } from 'react-router-dom'
import { useAlert } from '../context/AlertProvider'
import { useUser } from '../context/UserProvider'

const Login = () => {
  const navigate = useNavigate()
  const { showAlert } = useAlert()
  const { userState, userDispatch } = useUser()

  if (userState.isLoggedIn)
    return (<div>You are already logged in!</div>)
  
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

        localStorage.setItem("accessToken", result.tokens.accessToken)
        localStorage.setItem("refreshToken", result.tokens.refreshToken)

        userDispatch({ type: "LOGIN", payload: { nickname: nick } })

        showAlert(result.message)
        navigate("/")
      } catch (error) {
        alert(error)
      }
    }} />
  )
}

export default Login