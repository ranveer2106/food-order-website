import {
  // React, 
  useState
} from 'react'

import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
// import { useState } from 'react'

const Home = () => {
  const [category, setCategory] = useState("All");
  return (
    <>
      <div>
        Home
        <Header />
        <ExploreMenu category={category} setCategory={setCategory} />
        hhe
      </div>
    </>
  )
}

export default Home