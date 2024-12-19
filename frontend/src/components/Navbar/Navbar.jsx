import { React, useContext, useState } from 'react'
// import React,useState from 'react'
import { assets } from '../../assets/assets'
import "./Navbar.css"
import { Link,useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext'


const Navbar = ({ setshowLogin }) => {

  const [page, setPage] = useState("home");
  const {getTotalCartAmount,token,setToken} = useContext(StoreContext);


  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/")


    
  }


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
          <Link to="/myorders" onClick={() => setPage("MyOrders")} className={`mx-2 navbtn ${page === "MyOrders" ? "active" : " "}`}>
            {/* <Link to='/cart'>Menu</Link>  */}
            My Orders
          </Link>
          <Link to="/contactus" onClick={() => setPage("contact us")} className={`mx-2 navbtn ${page === "contact us" ? "active" : " "}`}>
            {/* <Link to='/'>Contact Us</Link> */}
            Contact US
          </Link>

        </ul>
        <ul className='nav-right flex items-center '>
          {/* <li className=' righticons' ><ion-icon name="search-outline" size="large"></ion-icon></li> */}
          <Link to='/cart'>
            <li className='cart-icon righticons'>
              <ion-icon name="cart-outline" size="large"></ion-icon>
              <div className={getTotalCartAmount()===0? "":"cartdot"}></div>
            </li>
          </Link>
          {!token?<button onClick={() => setshowLogin(true)} className='loginbtn '>Login</button>
          : <div className='navbar-profile'> 
                  
                  <div className='profilepic'>
                    <ion-icon  name="person-circle-outline" ></ion-icon>
                  </div>
            {/* <img className='profile-pic' src={assets.profile} alt="" /> */}
            <ul className="nav-profile-dropdown">
              <li onClick={()=>navigate('/myorders')}>Orders</li>
              <hr />
              <li onClick={logOut} >Logout</li>
            </ul>
          </div> 
          }
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