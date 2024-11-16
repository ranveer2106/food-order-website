import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <>
        <div className='footer flex-col	flex items-center	' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo} alt="logo"  className='w-40 footer-logo'/>
                    <p>stuff</p>
                    <div className="footer-social-icons">
                    <ion-icon name="logo-facebook"></ion-icon>
                    <ion-icon name="logo-instagram"></ion-icon>
                    <ion-icon name="logo-instagram"></ion-icon>
                    <ion-icon name="logo-instagram"></ion-icon>
                    </div>
                </div>
                <div className="footer-content-center">
                  <h2>COMPANY</h2>
                  <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Privacy Policy</li>
                    <li>Delivery</li>
                  </ul>
                </div>
                <div className="footer-content-right">
                  <h2>GET IN Touch</h2>
                  <ul>
                    <li>Phone: 123-456-7890</li>
                    <li>Email: rex@gmail.com</li>
                  </ul>                  
                </div>
            </div>
            <hr />

            <p className="footer-cpoyright">
              Copyright 2024 Rex. All rights reserved.
            </p>
        </div>
    </>
  )
}

export default Footer