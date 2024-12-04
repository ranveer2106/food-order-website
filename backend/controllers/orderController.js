import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Payment from "../models/paymentModel.js";
import Razorpay from 'razorpay';
import 'dotenv/config';
import crypto from 'crypto';


const razorpayInstance = new Razorpay({
    key_id: process.env.KEY_ID,  // Public key
    key_secret: process.env.SECRET_KEY  // Private key
});


const placeOrder = async (req, res) => {
    try {
        const { amount, userId, items, address } = req.body;

        // Create a new order in the database
        
        
        
        
        const options = {
            amount: Number(amount * 100),
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        }
        
        const newOrder = new orderModel({
            userId,
            items,
            amount,
            address,
            receipt:options.receipt
        });
        await newOrder.save();
        // await newOrder.save();
            
        
        // Clear the user's cart after placing the order
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});
        razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Something Went Wrong!" });
            }
            res.status(200).json({ data: order });
            
            // console.log(order)
        });



    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ message: "Internal server error!" });
    }
};


const verifyOrder = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature,amount,orderId,receipt } = req.body;

    // console.log("req.body", req.body);

    try {
        // Create Sign
        const sign = razorpay_order_id + "|" + razorpay_payment_id;

        // Create ExpectedSign
        const expectedSign = crypto.createHmac("sha256", process.env.SECRET_KEY)
            .update(sign.toString())
            .digest("hex");

        // console.log(razorpay_signature === expectedSign);

        // Create isAuthentic
        const isAuthentic = expectedSign === razorpay_signature;

        // console.log(`expected ${expectedSign}`);
        // console.log(`expected ${razorpay_signature}`);
        

        // Condition 
        if (isAuthentic) {
            const payment = new Payment({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
                amount,
                orderId,
                receipt
            });

            // Save Payment 
            await payment.save();

            // Send Message 
            res.json({
                message: "Payement Successfully"
            });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
}


const userOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({userId:req.body.userId});
        res.json({success:true,data:orders});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"});
        
    }
}


const listOrders = async(req,res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success:true,data:orders})
    } catch (error) {
        res.json({success:false,message:"Error"})
    }
}

// api for updating order status

const updateStatus = async (req,res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true,message:"Status Updated"})
    } catch (error) {
        res.json({success:false,message:"Error"})
        
    }
}

export { placeOrder, verifyOrder ,userOrders,listOrders,updateStatus};