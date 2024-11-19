import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'

const Navbar = () => {
  return (
    <div className='Navbar'>
        <img className='logo' src={assets.logo} alt="logo" />
        <img className='profile' src="" alt="profle" />
        
    </div>
  )
}

export default Navbar