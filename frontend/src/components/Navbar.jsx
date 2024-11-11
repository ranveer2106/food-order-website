import React from 'react'
import { assets } from '../../assets/assets'


const Navbar = () => {
  return (
    <>
        <div className='navbar flex'>
            <div className='w-20'><img className='w-20' src={assets.logo} alt="logo"  /></div>
            <div>
              <ul>
                <li><a href='/'>Home</a></li>
                <li><a href='/'>Menu</a></li>
                <li><a href='/'>Contact us</a></li>
              </ul>
            </div>
            <div>
              <div>Login</div>
              <div>Search</div>
              <div>Cart</div>
            </div>
        </div>
    </>
  )
}

export default Navbar