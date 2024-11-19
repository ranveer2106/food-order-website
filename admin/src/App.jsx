import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import Add from './pages/Add/Add'
import {  Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <>
    <Navbar/>
    <hr/>
      <div className='app-component'>
        <Sidebar/>
        <Routes>
          <Route path="/add" element={<Add/>} />
          <Route path="/list" element={<List/>} />
          <Route path="/orders" element={<Orders/>} />
        </Routes>
      </div>
    </>
  )
}

export default App