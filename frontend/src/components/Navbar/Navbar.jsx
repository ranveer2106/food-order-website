import { React, useState } from 'react'
// import React,useState from 'react'
import { assets } from '../../assets/assets'
import "./Navbar.css"
import { Link } from 'react-router-dom';

const Navbar = ({ setshowLogin }) => {

  const [page, setPage] = useState("home");
  return (
    <>
      <div className='navbar flex justify-between  '>
        <Link to={'/'} className='logocont '>
          <img src={assets.logo} alt="logo" className=' logo' />
        </Link>
        <ul className='flex items-center	nav-main'>


          <Link to="/" onClick={() => setPage("home")} className={`mx-2 navbtn ${page === "home" ? "active" : " "}`}>
            {/* <Link to='/'>Home</Link>   */}
            Home
          </Link>
          <a href="#explore-menu" onClick={() => setPage("menu")} className={`mx-2 navbtn ${page === "menu" ? "active" : " "}`}>
            {/* <Link to='/cart'>Menu</Link>  */}
            Menu
          </a>
          <a href="#footer" onClick={() => setPage("contact us")} className={`mx-2 navbtn ${page === "contact us" ? "active" : " "}`}>
            {/* <Link to='/'>Contact Us</Link> */}
            Contact US
          </a>

        </ul>
        <ul className='nav-right flex items-center '>
          <li className=' righticons' ><ion-icon name="search-outline" size="large"></ion-icon></li>
          <Link to='/cart'>
            <li className='cart-icon righticons'>
              <ion-icon name="cart-outline" size="large"></ion-icon>
              <div className='cartdot'></div>
            </li>
          </Link>
          <button onClick={() => setshowLogin(true)} className='loginbtn '>login</button>
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