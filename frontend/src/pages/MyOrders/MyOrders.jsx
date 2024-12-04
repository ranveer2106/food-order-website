import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import './MyOrders.css'
import React, { useState,useContext ,useEffect} from 'react'
// import { assets } from '../../assets/assets';

const MyOrders = () => {
    
    const {url,token} = useContext(StoreContext);
    const [data, setdata] = useState([]);

    const fetchOrders = async () => {
        const response = await axios.post(
            `${url}/api/order/userorders`, 
            {}, {
            headers: { 
              'content-type': 'application/json',
              token },
          });

        
        setdata(response.data.data);
        // console.log(response.data.data);
    }

    useEffect(() => {
      if (token){
        fetchOrders();
      }
      
    

    }, [token])
    

  return (
    <>
        <div className='my-orders'>
            <h1>My Orders</h1>
            <div className='container flex flex-col	'>
                {data.map((order,index)=>{
                    return(
                        <div key={index} className='my-orders-order'>
                            <div>cart icon here</div>
                            <p>
                                {order.items.map((item,index)=>{
                                    if (index === order.items.length-1){
                                        return item.name + " x " + item.quantity
                                    }
                                    else {
                                        return item.name + " x " + item.quantity + ", "
                                    }
                                })}
                            </p>
                            <p>${order.amount}.00</p>
                            <p>Items : {order.items.length}</p>
                            <p><span>&#x25cf;</span><b className='font-medium'>${order.status}</b></p>
                            <button onClick={fetchOrders} className='border-2'> Track order</button>
                        </div>
                    )
                })}
            </div>
        </div>
    </>
  )
}

export default MyOrders
