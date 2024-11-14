import {
  // React, 
  useState
} from 'react'

import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
// import { useState } from 'react'

const Home = () => {
  const [category, setCategory] = useState("All");
  return (
    <>
      <div>
        Home
        <Header />
        <ExploreMenu category={category} setCategory={setCategory} />
        <FoodDisplay category={category} />
        hhe
      </div>
    </>
  )
}

export default Home