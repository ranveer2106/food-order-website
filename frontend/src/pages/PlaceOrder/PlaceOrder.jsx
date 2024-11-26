import React, { useEffect } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import { useContext,useState } from 'react'
import axios from 'axios'
// import { placeOrder } from '../../../../backend/controllers/orderController'


const PlaceOrder = () => {
  const {getTotalCartAmount,token,food_list,cartItems,url } = useContext(StoreContext);

  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:"",
  })

  const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
  }

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if (cartItems[item._id]>0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    // console.log(orderItems);
    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount+2
    }
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}});
    if(response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url);
    }
    else{
      alert("error");
    }
  }



  // useEffect(()=>{
  //   console.log(data);
    
  // },[data])


  return (
    <>
        <form onSubmit={placeOrder} className='place-order flex justify-between items-start	'>
          <div className="place-order-left">
            <p className="title">Delivery Information</p>
            <div className="multi-fields">
              <input required type="text" name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder='First name'/>
              <input  type="text" name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder='Last name'/>
            </div>
            <input required type="email" onChange={onChangeHandler} name='email' value={data.email} placeholder='Email address' />
            <input required type="text" onChange={onChangeHandler} name='street' value={data.street} placeholder='street' />
            <div className="multi-fields">
              <input required type="text" onChange={onChangeHandler} name='city' value={data.city} placeholder='City'/>
              <input required type="text" onChange={onChangeHandler}  name='state' value={data.state} placeholder='State'/>
            </div>
            <div className="multi-fields">
              <input required type="text" onChange={onChangeHandler} value={data.zipcode} name='zipcode' placeholder='Zip Code' />
              <input required type="text" onChange={onChangeHandler} value={data.country} name='country' placeholder='Country' />
            </div>
            <input required type="text" onChange={onChangeHandler} value={data.phone} name="phone" placeholder='Phone number' />
          </div>
          <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p> {getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>{getTotalCartAmount()===0?0:2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>{getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
              </div>
              <button type='submit'>PROCEED TO CHECKOUT</button>
            </div>
          </div>
          </div>
        </form>
    </>
  )
}

export default PlaceOrder