import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import paymentModel from "../models/paymentModel.js"
import Razorpay from 'razorpay';
import 'dotenv/config';
import crypto from 'crypto';


// // import items from "razorpay/dist/types/items.js";



// // placing user order for frontend 


const razorpayInstance = new Razorpay({
    key_id: process.env.KEY_ID,  // Public key
    key_secret: process.env.SECRET_KEY  // Private key
});





const placeOrder = async (req, res) => {
    try {
        const { amount,userId,items,address } = req.body;
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address,                        
            })
                    
            await newOrder.save();
            
            await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});
        const options = {
            amount: Number(amount * 100),
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
            notes: {
                items: JSON.stringify(items),
                address: JSON.stringify(address),
                user_id: userId   // Add the custom order ID
            }
        }
        razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Something Went Wrong!" });
            }
            res.status(200).json({ data: order });
            console.log(order)
        });

        
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
        
    }
}


// const placeOrder = async (req,res) => {

//     // const amount = req.body.amount;
//     // const frontend_url = "http://localhost:5173";


    
//     try {
        
//         const newOrder = new orderModel({
//             userId:req.body.userId,
//             items:req.body.items,
//             amount:req.body.amount,
//             address:req.body.address,
            
//         })
        
//         await newOrder.save();
//         await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});
        
        
        
//         const options = {
//             amount: req.body.amount*100, // amount in smallest currency unit
//             currency: "INR",
//             receipt: "receipt_order_74394",
//         };
//         console.log("io");

//     razorpayInstance.orders.create(options, (error, order) => {
//         if (error) {
//             console.log(error);
//             return res.status(500).json({ message: "Something Went Wrong!" });
//         }
//         res.status(200).json({ data: order });
//         console.log(order)
//     });


//     } 
    
//     catch (error) {
//         res.status(500).json({ message: "Internal Server Error!" });

//         console.log(error);
        
//     }
// }


const verifyOrder = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, } = req.body;

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
        console.log("it ia auth"+ isAuthentic);
        

        // Condition 
        if (isAuthentic) {

            const paymentDetails = await razorpayInstance.orders.fetch(razorpay_order_id);
            const { userId } = JSON.parse(paymentDetails.notes); 
            const amount = paymentDetails.amount / 100;
            const receipt = paymentDetails.receipt;


            const payment = new paymentModel({
                razorpay_order_id:razorpay_order_id,
                razorpay_payment_id:razorpay_payment_id,
                razorpay_signature:razorpay_signature,
                amount:amount,
                userId:userId,
                receipt:receipt,
                
            });

            // Save Payment 
            await payment.save();
            console.log("print it!!!!!!!!!!!!!!!!!");
            

            
            // Send Message 
            res.json({
                message: "Payement Successfully"
            });
        }
        else{
            console.log("fuck you");
            
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
}




export {placeOrder,verifyOrder}


