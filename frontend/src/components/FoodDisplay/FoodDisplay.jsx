import React, { useContext } from 'react'
import "./FoodDisplay.css"
// import { food_list } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContent'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({category}) => {

    const {food_list} = useContext(StoreContext);
  return (
    <>
        <div className="food-display mt-20">
            <h2 className='text-center font-semibold	'>Top Dishes near you</h2>
            <div className="food-display-list ">
                {food_list.map((item,index)=>{

                    if (category==="All" || category===item.category ) {
                        return <FoodItem key={index} id={item.id} name={item.name} description={item.description} image={item.image} price={item.price} />

                    }
                })}
            </div>
        </div>
    </>
  )
}

export default FoodDisplay