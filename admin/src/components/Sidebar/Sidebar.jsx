import React from 'react'
import './Sidebar.css'
import {NavLink} from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to={'/add'} className="sidebar-option">
            <div><ion-icon name="add-circle-outline"></ion-icon></div>
           <p>add icon</p>

        </NavLink>
        <NavLink to={'list'} className="sidebar-option">
          <div><ion-icon name="list-outline"></ion-icon></div>
           <p>list icon</p>
        </NavLink>
        <NavLink to={'orders'} className="sidebar-option">
          <div><ion-icon name="cart"></ion-icon></div>
           <p>order icon</p>

        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar