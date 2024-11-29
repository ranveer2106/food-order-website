import React, { useEffect } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import { useContext,useState } from 'react'
import axios from 'axios'
// import { placeOrder } from '../../../../backend/controllers/orderController'


const PlaceOrder = () => {
  const {getTotalCartAmount,token,food_list,cartItems,url } = useContext(StoreContext);

  // let total = getTotalCartAmount;

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
      
  //     const placeOrder = async (event) => {
  //       event.preventDefault();
  //       let total = getTotalCartAmount();
  //   let orderItems = [];
  //   food_list.map((item)=>{
  //     if (cartItems[item._id]>0){
  //       let itemInfo = item;
  //       itemInfo["quantity"] = cartItems[item._id];
  //       orderItems.push(itemInfo);
  //     }
  //   })
    
  //   // console.log(orderItems);
  //   let orderData = {
  //     address:data,
  //     items:orderItems,
  //     amount:total+2
  //   }
  //   console.log(orderData);
  //   console.log(token);
    
  //   let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}});
  //   console.log("response");
    
  //   console.log(response);
    
  //   if(response.data.success){
  //     // const {session_url} = response.data;
  //     window.location.replace("https://www.youtube.com/");
  //   }
  //   else{
  //     alert("error");
  //     console.log("kiki");
      
  //     console.log(response);
      
  //   }
  // }


  const placeOrder = async (event) => {
    event.preventDefault();
    
    // Flag to track if the response is received
    let responseReceived = false;
    
    // Calculate total order amount
    let total = getTotalCartAmount();
    
    // Prepare the order items array
    let orderItems = [];
    food_list.map((item) => {
        if (cartItems[item._id] > 0) {
            let itemInfo = item;
            itemInfo["quantity"] = cartItems[item._id];
            orderItems.push(itemInfo);
        }
    });

    // Prepare the order data
    let orderData = {
        address: data,
        items: orderItems,
        amount: total + 2 // Total + any additional fees (like shipping)
    };
    
    console.log("Order Data: ", orderData);
    console.log("Token: ", token);

    try {
        // Send the POST request to place the order
        let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
        
        console.log("Response: ", response);

        // If a valid response is received, set the flag to true
        responseReceived = true;

        // Check if the order was successful
        if (response.data) {
            // Trigger payment if the order was placed successfully
            handlePayment(response.data);  // Pass response data to handlePayment function
        } else {
            // Handle failure (e.g., display error message)
            alert("There was an error placing your order. Please try again.");
            console.log("Error Response: ", response);
        }
    } catch (error) {
        // Handle network or other unexpected errors
        alert("An error occurred. Please check your connection and try again.");
        console.error("Error placing order: ", error);
    }

    // Log whether the response was received or not
    console.log("Response received status: ", responseReceived);
};

// Function to handle Razorpay payment
const handlePayment = async (orderData) => {
    const options = {
        key: "rzp_test_zLMC4qz18kVoX9", // Replace with your Razorpay key
        amount: orderData.amount,
        currency: orderData.currency,
        name: "ranvir",  // Replace with your business name
        description: "Test Mode",  // Replace with your order description
        order_id: orderData.id,  // The order ID received from the backend
        handler: async (response) => {
            console.log("Payment response", response);
            try {
                const res = await fetch(`http://localhost:4000/api/order/verify`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        amount: orderData.amount,  // Amount of the order
                        userId: orderData.userId,
                        receipt:orderData.receipt
                    })
                });

                const verifyData = await res.json();

                if (verifyData.message) {
                  console.log("jojo");
                  
                  // window.location.replace(`https://www.google.com/`);
                    // Assuming you are using a toast library to display messages
                  // window.location.replace(`/payment-success/${orderData.receipt}`);  // Assuming you are using a toast library to display messages
                }
            } catch (error) {
                console.log("Error verifying payment", error);
            }
        },
        theme: {
            color: "#5f63b8"  // Customize the theme color for Razorpay
        }
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();  // Open Razorpay payment gateway
};





  // useEffect(()=>{
  //   console.log(orderData);
    
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