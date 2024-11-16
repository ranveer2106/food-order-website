import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'

const AppDownload = () => {
  return (
    <>
        <div className='app-download'>
            <p>For Better Experience Download <br /> Foodys App</p>
            <div className="app-download-platforms flex justify-center	">
                <img   src={assets.playstore} alt="playstore" />
                <img   src={assets.appstore} alt="appstore" />
            </div>
        </div>
    </>
  )
}

export default AppDownload