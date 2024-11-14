import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <>
        <div className='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo} alt="logo"  className='w-40'/>
                    <p>stuff</p>
                    <div className="social-icons">
                    <ion-icon name="logo-facebook"></ion-icon>
                    <ion-icon name="logo-instagram"></ion-icon>
                    <ion-icon name="logo-instagram"></ion-icon>
                    <ion-icon name="logo-instagram"></ion-icon>
                    </div>
                </div>
                <div className="footer-content-center">

                </div>
                <div className="footer-content-right">

                </div>
            </div>
        </div>
    </>
  )
}

export default Footer