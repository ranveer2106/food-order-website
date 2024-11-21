import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from 'razorpay';
// import items from "razorpay/dist/types/items.js";



// placing user order for frontend 


const razorpay = new Razorpay({
    key_id: process.env.KEY_ID,  // Public key
    key_secret: process.env.SECRET_KEY  // Private key
});

const placeOrder = async (req,res) => {
    const frontend_url = "http://localhost:5173"
    try {
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.address,

        })

        await newOrder .save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

        const line_items = req.body.items.map((item) => ({
                price_data: {
                    currency: "INR",
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: item.price * 100, // Razorpay expects amount in paise (smallest unit)
                },
                quantity: item.quantity , // Ensure quantity is included, or default to 1 if not specified
            
        }));

        line_items.push({
            price_data:{
                currency:"INR",
                product_data:{
                    name: "Delivery Charges"
                },
                // 30rs delivery charges

                unit_amountL:30*100
            },
            quantity:1
        })
        
        const session = await st


    } catch (error) {
        
    }
}

export {placeOrder}