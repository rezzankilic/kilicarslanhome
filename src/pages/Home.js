import React, { useContext, useEffect, useState } from 'react'
import { LoginContext } from '../App'
import Dashboard from './Dashboard'
import Login from './Login'



export default function Home() {
  const [loggedin, setLoggedin] = useContext(LoginContext)


  return (
    <div className='screen'>
        

      <Dashboard />
    
        
        
    </div>
  )
}
