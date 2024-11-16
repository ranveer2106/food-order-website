import { useContext, } from "react"
import React from 'react'
import "./FoodItem.css"
import { StoreContext } from "../../context/StoreContext"

const FoodItem = ({id,name,price,description,image}) => {

  const {cartItems,addToCart,removeFromCart}=useContext(StoreContext)

  return (
    <>
        <div className='food-item my-10 w-full m-auto'>
            <div className="food-item-img-container relative	">
              <img src={image} alt="" className="food-item-image w-full" />
                {
                  !cartItems[id]
                  ?<div>
                    
                    <button className="add" onClick={()=>addToCart(id)}>
                      <ion-icon name="add-outline"></ion-icon>
                    </button>
                  </div>: <div className="food-item-counter flex " >
                  <button onClick={()=>removeFromCart(id)}  >
                      <ion-icon name="remove-outline"></ion-icon>
                    </button>
                    <p>
                      {cartItems[id]}
                    </p>
                    <button onClick={()=>addToCart(id)}>
                      <ion-icon name="add-outline"></ion-icon>
                    </button>
                  </div>  
                  

                }
            </div>
            <div className="food-item-info">
                <h1 className="food-item-name font-medium">{name}</h1>
                <p className="food-item-price font-medium">Price: ${price}</p>
                <p className="food-item-description">{description}</p>
            </div>
        </div>
    </>
  )
}

export default FoodItem