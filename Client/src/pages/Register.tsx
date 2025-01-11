import React from 'react'
import UserForm from '../components/UserForm'

const Register = () => {
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
        alert(result.message)
      } catch (error) {
        alert(error)
      }
    }} />
  )
}

export default Register