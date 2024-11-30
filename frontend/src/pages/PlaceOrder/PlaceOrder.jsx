import React, { useEffect, useState, useContext } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  // State to manage customer details
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  // Update state for each input field
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Function to handle placing the order
  const placeOrder = async (event) => {
    event.preventDefault();

    // Calculate the total order amount
    const totalAmount = getTotalCartAmount();
    
    // Prepare the order items list
    const orderItems = prepareOrderItems();

    // Prepare order data
    const orderData = {
      address: data,
      items: orderItems,
      amount: totalAmount + 2,  // Include additional fee (e.g., delivery fee)
    };

    console.log("Order Data: ", orderData);
    console.log("Token: ", token);

    try {
      // Send POST request to backend to place the order
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token },
      });

      console.log("Response: ", response);

      // If the order is placed successfully, trigger the payment
      if (response.data) {
        // handlePayment(response.data);
        handlePaymentVerify(response.data)
      } else {
        alert("There was an error placing your order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order: ", error);
      alert("An error occurred. Please check your connection and try again.");
    }
  };

  // Function to prepare the order items array
  const prepareOrderItems = () => {
    return food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        return {
          ...item,
          quantity: cartItems[item._id],  // Add quantity to item data
        };
      }
      return null;
    }).filter(Boolean);  // Filter out null entries
  };

  // Function to handle Razorpay payment
  // const handlePayment = async (orderData) => {
  //   const options = {
  //     key: "rzp_test_zLMC4qz18kVoX9",  // Replace with your Razorpay key
  //     amount: orderData.amount,
  //     currency: orderData.currency,
  //     name: "ranvir",  // Replace with your business name
  //     description: "Test Mode",  // Replace with your order description
  //     order_id: orderData.id,  // The order ID received from the backend
  //     // handler: async (response) => 
  //     //   {
  //     //   console.log("Payment response", response);
  //     //   try {
  //     //     // const res = await fetch(`${url}/api/order/verify`, {
  //     //     //   method: 'POST',
  //     //     //   headers: { 'content-type': 'application/json' },
  //     //     //   body: JSON.stringify({
  //     //     //     razorpay_order_id: response.razorpay_order_id,
  //     //     //     razorpay_payment_id: response.razorpay_payment_id,
  //     //     //     razorpay_signature: response.razorpay_signature,
  //     //     //     amount: orderData.amount,
  //     //     //     userId: orderData.userId,
  //     //     //     receipt: orderData.receipt,
  //     //     //   }),
  //     //     // });
  //     //     const res = await axios.post(`${url}/api/order/verify`,  {
  //     //       method: 'POST',
  //     //       headers: {
  //     //           'content-type': 'application/json'
  //     //       },
  //     //       body: JSON.stringify({
  //     //           razorpay_order_id: response.razorpay_order_id,
  //     //           razorpay_payment_id: response.razorpay_payment_id,
  //     //           razorpay_signature: response.razorpay_signature,
  //     //       })
  //     //   })
  //     //   //     {
  //     //   //     razorpay_order_id: response.razorpay_order_id,
  //     //   //     razorpay_payment_id: response.razorpay_payment_id,
  //     //   //     razorpay_signature: response.razorpay_signature,
  //     //   //     // amount: orderData.amount,  // Amount of the order
  //     //   //     // userId: orderData.userId,
  //     //   //     // receipt: orderData.receipt
  //     //   // }, {
  //     //   //     headers: {                
  //     //   //         'Content-Type': 'application/json'  // Specify content type
  //     //   //     }
  //     //   //     // headers: { token },
  //     //   // });

  //     //     const verifyData = await res.json();

          
  //     //     console.log(verifyData);
          
  //     //     if (verifyData.message) {
  //     //       console.log("Payment verified successfully.");
  //     //       // window.location.replace(`/payment-success/${orderData.receipt}`);  // Redirect to payment success page
  //     //     }
  //     //   } catch (error) {
  //     //     console.error("Error verifying payment front", error);
  //     //   }
  //     // },
  //     handler: async (response) => {
  //       console.log("response", response)
  //       try {
  //           const res = await fetch(`${url}/api/order/verify`, {
  //               method: 'POST',
  //               headers: {
  //                   'content-type': 'application/json'
  //               },
  //               body: JSON.stringify({
  //                   razorpay_order_id: response.razorpay_order_id,
  //                   razorpay_payment_id: response.razorpay_payment_id,
  //                   razorpay_signature: response.razorpay_signature,
  //               })
  //           })

  //           const verifyData = await res.json();

  //           if (verifyData.message) {
  //               // toast.success(verifyData.message)
  //               console.log(verifyData);
                
  //               console.log("succrss");
                
  //           }
  //       } catch (error) {
  //           console.log(error);
  //       }
  //   },
  //     theme: {
  //       color: "#5f63b8",  // Customize the theme color for Razorpay
  //     },
  //   };


  // const handlePaymentVerify = async (data) => {
  //   const options = {
  //       key: "rzp_test_zLMC4qz18kVoX9",
  //       amount: data.amount,
  //       currency: data.currency,
  //       name: "ranvir",
  //       description: "Test Mode",
  //       order_id: data.id,
  //       handler: async (response) => {
  //           console.log("response", response)
  //           try {
  //               const res = await fetch(`http://localhost:4000/api/order/verify`, {
  //                   method: 'POST',
  //                   headers: {
  //                       'content-type': 'application/json'
  //                   },
  //                   body: JSON.stringify({
  //                       razorpay_order_id: response.razorpay_order_id,
  //                       razorpay_payment_id: response.razorpay_payment_id,
  //                       razorpay_signature: response.razorpay_signature,
  //                   })
  //               })

  //               const verifyData = await res.json();

  //               if (verifyData.message) {
  //                   // toast.success(verifyData.message)
  //                   console.log("verify");
                    
  //               }
  //           } catch (error) {
  //               console.log(error);
  //           }
  //       },
  //       theme: {
  //           color: "#5f63b8"
  //       }
  //   };

  //   const rzp1 = new window.Razorpay(options);
  //   rzp1.open();  // Open the Razorpay payment gateway
  // };


  // import axios from 'axios';  // Ensure axios is imported

const handlePaymentVerify = async (data) => {
    const options = {
        key: "rzp_test_zLMC4qz18kVoX9",  // Replace with your Razorpay key
        amount: data.amount,
        currency: data.currency,
        name: "ranvir",  // Replace with your business name
        description: "Test Mode",  // Replace with your order description
        order_id: data.id,
        handler: async (response) => {
            console.log("response", response);
            try {
                // Use axios to make a POST request
                const res = await axios.post(`${url}/api/order/verify`, {
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                });

                // If the response is successful, handle it
                if (res.data.message) {
                    console.log("Payment verified successfully.");
                    // You can display a success message here or redirect the user
                }
            } catch (error) {
                // Handle errors here
                console.error("Error verifying payment:", error);
            }
        },
        theme: {
            color: "#5f63b8",  // Customize the theme color for Razorpay
        }
    };

    // Open the Razorpay payment gateway
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
};


  // Render the form with delivery information and cart totals
  return (
    <>
      <form onSubmit={placeOrder} className="place-order flex justify-between items-start">
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input
              required
              type="text"
              name="firstName"
              onChange={onChangeHandler}
              value={data.firstName}
              placeholder="First name"
            />
            <input
              type="text"
              name="lastName"
              onChange={onChangeHandler}
              value={data.lastName}
              placeholder="Last name"
            />
          </div>
          <input
            required
            type="email"
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            placeholder="Email address"
          />
          <input
            required
            type="text"
            name="street"
            onChange={onChangeHandler}
            value={data.street}
            placeholder="Street"
          />
          <div className="multi-fields">
            <input
              required
              type="text"
              name="city"
              onChange={onChangeHandler}
              value={data.city}
              placeholder="City"
            />
            <input
              required
              type="text"
              name="state"
              onChange={onChangeHandler}
              value={data.state}
              placeholder="State"
            />
          </div>
          <div className="multi-fields">
            <input
              required
              type="text"
              name="zipcode"
              onChange={onChangeHandler}
              value={data.zipcode}
              placeholder="Zip Code"
            />
            <input
              required
              type="text"
              name="country"
              onChange={onChangeHandler}
              value={data.country}
              placeholder="Country"
            />
          </div>
          <input
            required
            type="text"
            name="phone"
            onChange={onChangeHandler}
            value={data.phone}
            placeholder="Phone number"
          />
        </div>

        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>{getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>{getTotalCartAmount() === 0 ? 0 : 2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
              </div>
              <button type="submit">PROCEED TO CHECKOUT</button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default PlaceOrder;
