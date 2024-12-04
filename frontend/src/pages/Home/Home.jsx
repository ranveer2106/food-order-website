import {
  // React, 
  useState
} from 'react'
import './home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
// import Footer from '../../components/Footer/Footer'
import AppDownload from '../../components/AppDownload/AppDownload'
// import { useState } from 'react'

const Home = () => {
  const [category, setCategory] = useState("All");
  return (
    <>
      <div className='Home'>
        {/* Home */}
        <Header />
        <ExploreMenu category={category} setCategory={setCategory} />
        <FoodDisplay category={category} />
        <AppDownload/>
      </div>
        {/* <Footer/> */}
    </>
  )
}

export default Home