
import
//  React, 
{ useEffect, useState, useContext } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  const navigate = useNavigate();

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

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    const totalAmount = getTotalCartAmount();

    const orderItems = prepareOrderItems();

    const orderData = {
      address: data,
      items: orderItems,
      amount: totalAmount + 2,
    };

    // console.log("Order Data: ", orderData);
    // console.log("Token: ", token);


    try {
      const response = await axios.post(
        `${url}/api/order/place`,
        orderData, {
        headers: {
          'content-type': 'application/json',
          token
        },
      });

      const dex = await response.data;



      // console.log("Response: ", dex);
      // console.log(dex.data);


      if (dex) {
        handlePaymentVerify(dex.data);
      } else {
        alert("There was an error placing your order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order: ", error);
      alert("An error occurred. Please check your connection and try again.");
    }
  };

  const prepareOrderItems = () => {
    return food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        return {
          ...item,
          quantity: cartItems[item._id],
        };
      }
      return null;
    }).filter(Boolean);
  };


  const handlePaymentVerify = async (data) => {
    const options = {
      key: "rzp_test_lfXfbPqLBLUDQV",
      amount: data.amount,
      currency: data.currency,
      name: "ranvir",
      description: "Test Mode",
      order_id: data.id,
      handler: async (response) => {
        // console.log("response", response)
        try {

          const res = await axios.post(
            `${url}/api/order/verify`,  // The API URL
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              amount: data.amount,
              orderId: data.id,
              receipt: data.receipt,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              }
            }
          );

          const verifyData = await res.data;



          if (verifyData.message === "Payement Successfully") {
            // console.log("ggggggggggggs");
            // navigate("/myorders");
            window.location.replace(`https://foodys.onrender.com/myorders`)
          }
          else {
            // navigate("/");
            window.location.replace(`https://foodys.onrender.com/`)
          }
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#5f63b8"
      }
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  }

  useEffect(() => {
    if (!token) {
      navigate('/cart')
    }
    else if (getTotalCartAmount() === 0) {
      alert("please select an item")
      navigate(`/cart`)
    }
  })


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
