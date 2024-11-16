import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'

const Cart = () => {

  const {cartItems,food_list,removeFromCart} = useContext(StoreContext);



  return (
    <>
        <div className='cart'>
            <div className="cart-items">
              <div className="cart-items-title">
                <p>items</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
              </div>
              <br />
              <hr />
              {
                food_list.map((item,index)=>{
                  if (cartItems[item.id]>0)
                  {
                    return(
                      <div > 
                        <div key={index} className="cart-items-title cart-items-item">
                          <img src={item.image} alt="item" />
                          <p>{item.name}</p>
                          <p>
                            Rs{item.price}</p>
                          <p>{cartItems[item.id]}</p>
                          <p>Rs{item.price*cartItems[item.id]}</p>
                          <p onClick={()=>removeFromCart(item.id)} className='cross'>x</p>
                        </div>
                        <hr />
                      </div>
                    )
                  }
                })
              }

            </div>
            <div className="cart-bottom">
              <div className="cart-total">
                <h2>Cart Total</h2>
                <div>
                  <div className="cart-total-details">
                    <p>Subtotal</p>
                    <p> {0}</p>
                  </div>
                  <hr />
                  <div className="cart-total-details">
                    <p>Delivery Fee</p>
                    <p>{2}</p>
                  </div>
                  <hr />
                  <div className="cart-total-details">
                    <b>Total</b>
                    <b>{0}</b>
                  </div>
                  <button>PROCEED TO CHECKOUT</button>
                </div>
              </div>
                <div className="cart-promocode">
                  <div>
                    <p>If you have a promo code, Enter it here</p>
                    <div className='cart-promocode-input'>
                      <input type="text" placeholder='promocode'/>
                      <button>Submit</button>
                    </div>
                  </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Cart