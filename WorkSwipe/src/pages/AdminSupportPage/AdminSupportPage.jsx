import { Chat } from '@mui/icons-material'
import React from 'react'
import { useSelector } from 'react-redux'

const AdminSupportPage = () => {
    const user = useSelector((state)=>state.auth.role)
    const admin = {
        id:0,
        username: "adminUser",
        name: "Admin User",
        isEmployer: false,
        isAdmin: true,
        email: "adminuser@example.com",
      }
  return (
    <Chat user1={user} user2={admin}  welcomeMsg1={"Hello, how can we assist you?"}/>
  )
}

export default AdminSupportPage