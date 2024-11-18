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
          <Route path='/PlaceOrder' element={<PlaceOrder />} />

        </Routes>
        <Footer />



      </div>

    </>
  )
}

export default App
