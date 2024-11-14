import React from 'react'
import "./FoodItem.css"

const FoodItem = ({id,name,price,description,image}) => {
  return (
    <>
        <div className='food-item my-10'>
            <div className="food-item-img-container">
                <img src={image} alt="" className="food-tem-image" />
            </div>
            <div className="food-item-info">
                <h1 className="food-item-name">{name}</h1>
                <p className="food-item-price">Price: ${price}</p>
                <p className="food-item-description">{description}</p>
            </div>
        </div>
    </>
  )
}

export default FoodItem