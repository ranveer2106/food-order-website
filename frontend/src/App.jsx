import {
  // React,
  useState
} from 'react'
// import { assets } from './assets/assets'
import Navbar from './components/Navbar/Navbar'
import './App.css'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import MyOrders from './pages/MyOrders/MyOrders'
import ContactUs from './pages/ContactUs/ContactUs'

const App = () => {


  const [showLogin, setshowLogin] = useState(false)

  return (
    <>

      {
        showLogin ? <LoginPopup setshowLogin={setshowLogin} /> : <></>
      }
      <div className='App'>
        <Navbar setshowLogin={setshowLogin} />


        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/myorders' element={<MyOrders/>} />
          <Route path='/contactus' element={<ContactUs/>}/>
        </Routes>
        <Footer />



      </div>

    </>
  )
}

export default App
