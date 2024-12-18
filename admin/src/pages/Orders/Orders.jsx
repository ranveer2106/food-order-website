import './Orders.css'
import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import { assets } from '../../assets/assets';

import {toast} from 'react-toastify'

const Orders = ({url}) => {
  const [orders,setOrder] = useState([]);

  const fetchAll = async() =>{
    const response = await axios.get(
      `${url}/api/order/list`
    )
    if(response.data.success){
      setOrder(response.data.data);
      // console.log(response.data.data);
    }
    else{
      toast.error("Error")
      
    }};
  const statusHandler = async (event ,orderId) => {
    // console.log(event,orderId);
    const response = await axios.post(
      `${url}/api/order/status`,
      {
        orderId,
        status:event.target.value
      }
    )
    if (response.data.success) {
      await fetchAll();
    }
  }



    useEffect(()=>{
      fetchAll();
    },[])
  

    
  return (
    <>
    <div className='order add'>
      <div>Order Page</div>
      <div className='order-list'>
        {
          orders.map((order,index)=>(
            <div key={index} className='order-item'>
              <img src={assets.logo} alt="" />
              <div>
                <p className='order-item-food'>
                  {
                    order.items.map((item,index)=>{
                      if (index===order.items.length-1) {
                        return item.name + " x " + item.quantity
                      }
                      else{
                        return item.name + " x " + item.quantity + ", "
                      }
                    })
                  }
                </p>
                <p className='order-item-name'>{order.address.firstName+" "+order.address.lastName}</p>
                <div className='order-item-address'>
                  <p>{order.address.street+","}</p>
                  <p>{order.address.city+","+order.address.state+","+order.address.country+","+ order.address.zipcode }</p>
                </div>
                <p className='order-item-phone'>{order.address.phone}</p>
              </div>
              <p>Items : {order.items.length}</p>
              <p>${order.amount}</p>
              <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>

                <option value="Food Processing">Food Processing </option>
                <option value="Out for delivery">Out for Delivery </option>
                <option value="Delivered">Delivered</option>

              </select>
            </div>
          ))
        }
      </div>
    </div>
    </>
  )
}

export default Orders