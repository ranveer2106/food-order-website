import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <>
        <div className='Header rounded-2xl'>
            <div className='Header-content flex items-start	flex-col	'>
                <h2 className='Header-title text-white	font-medium	'>Order Your Favourite food here</h2>
                <p className='Header-subtitle text-white'>Order food online from your favourite restaurants and get food delivered</p>
                <button className='p-4 rounded-full	bg-white text-black font-medium'>View Menu</button>
            </div>
        </div>
    </>
  )
}

export default Header