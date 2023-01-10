import React from 'react'
import { NavLink } from 'react-router-dom'

import './Sidebar.css'
import AddICon from '../assets/add_icon.svg'
import DashboardIcon from '../assets/dashboard_icon.svg'
import Temple from '../assets/temple.svg'



export default function Sidebar() {
  return (
    <div className='sidebar'>
        <div className='sidebar-content'>
            <div className='user'>
                <img src={Temple} alt='temple image' />
                <p>Hey, you</p>
            </div>
            <nav className='links'>
                <ul>
                    <li>
                        <NavLink to='/'>
                            <img src={DashboardIcon} alt='dashboard image'/>
                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/create'>
                            <img src={AddICon} alt='add project icon'/>
                            <span>Table</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
  )
}
