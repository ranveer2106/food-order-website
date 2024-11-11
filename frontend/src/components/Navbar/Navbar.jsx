import React from 'react'
import { assets } from '../../assets/assets'
import "./Navbar.css"

const Navbar = () => {
  return (
    <>
      <div className='flex justify-between border-b-4'>
        <a href="/" className='logocont pt-2'>
          <img src={assets.logo} alt="logo" className=' logo' />
        </a>
        <ul className='flex items-center	'>
          <li className=''><a href="/" className='btn'>Home</a> </li>
          <li className=''><a href="/" className='btn'>Menu</a> </li>
          <li className=''><a href="/" className='btn'> Contact Us</a></li>
        </ul>
        <div className='pt-4'>
          <a href='/' className='px-4 btn'>Search</a>
          <a href="/" className='px-4 btn'>Cart</a>
          <a href="/" className='px-4 btn'>Login</a>
        </div>

      </div>
    </>
  )
}

export default Navbar