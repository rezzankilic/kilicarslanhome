import React, { useContext, useEffect } from 'react'
import { LoginContext } from '../App'
import './Navbar.css'


export default function Navbar() {
  const [loggedin, setLoggedin] = useContext(LoginContext);

  // const handleLogout = (e) => {
  //   e.preventDefault
  //   localStorage.clear()
  // }
 

  return (

    <nav className='navbar'>
        <ul className='navbar-nav'>
            <li className='nav-item'>

                {loggedin ? 
                <a href='/login' className='nav-link' onClick={()=>{localStorage.clear()}}>
                Log out </a> :  
                <a href='/login' className='nav-link'>
                Log In</a> }
            </li>
        </ul>
    </nav>
  )
}
