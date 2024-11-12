import { useState } from 'react'
// import React,useState from 'react'
import { assets } from '../../assets/assets'
import "./Navbar.css"

const Navbar = () => {

  const [page, setPage] = useState("menu");
  return (
    <>
      <div className='navbar flex justify-between border-b-4 px-12'>
        <a href="/" className='logocont pt-2'>
          <img src={assets.logo} alt="logo" className=' logo' />
        </a>
        <ul className='flex items-center	nav-main'>
          <li onClick={()=>setPage("home")} className={`mx-2 navbtn ${page==="home"?"active":" "}` }>Home </li>
          <li onClick={()=>setPage("menu")} className={`mx-2 navbtn ${page==="menu"?"active":" "}` }>Menu </li>
          <li onClick={()=>setPage("contact us")} className={`mx-2 navbtn ${page==="contact us"?"active":" "}` }>Contact Us </li>

        </ul>
        <ul className='flex items-center '>
          <li className='mx-4 righticons' ><ion-icon name="search-outline" size="large"></ion-icon></li>
          <li className='cart-icon mx-4 righticons'><ion-icon name="cart-outline" size="large"></ion-icon>
            <div className='cartdot'></div>
          </li>
          <li className='loginbtn mx-4'>login</li>
          {/* <li><a href='/' className='mx-4 righticons'><ion-icon name="search-outline" size="large"></ion-icon></a></li> */}
          {/* <li className='cart-icon'><a href="/" className='mx-4 righticons'><ion-icon name="cart-outline" size="large"></ion-icon></a>
            <div className='cartdot'></div>
          </li> */}
          {/* <li><a href="/" className='mx-4 loginbtn'> Login </a></li> */}


        </ul>

      </div>
    </>
  )
}

export default Navbar