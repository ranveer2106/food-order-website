import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from 'razorpay';
import 'dotenv/config';

// // import items from "razorpay/dist/types/items.js";



// // placing user order for frontend 


const instance = new Razorpay({
    key_id: process.env.KEY_ID,  // Public key
    key_secret: process.env.SECRET_KEY  // Private key
});


const placeOrder = async (req,res) => {

    // const amount = req.body.amount;
    // const frontend_url = "http://localhost:5173";


    
    try {
        
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address,
            
        })
        
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});
        
        
        
        const options = {
            amount: req.body.amount*100, // amount in smallest currency unit
            currency: "INR",
            receipt: "receipt_order_74394",
        };
        console.log("io");

    razorpayInstance.orders.create(options, (error, order) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: "Something Went Wrong!" });
        }
        res.status(200).json({ data: order });
        console.log(order)
    });


    } 
    
    catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });

        console.log(error);
        
    }
}





export {placeOrder}


