// import orderModel from "../models/orderModel.js";
// import userModel from "../models/userModel.js";
// import Payment from "../models/paymentModel.js"
// import Razorpay from 'razorpay';
// import 'dotenv/config';
// import crypto from 'crypto';


// // // import items from "razorpay/dist/types/items.js";



// // // placing user order for frontend 


// const razorpayInstance = new Razorpay({
//     key_id: process.env.KEY_ID,  // Public key
//     key_secret: process.env.SECRET_KEY  // Private key
// });





// const placeOrder = async (req, res) => {
//     try {
//         const { amount,userId,items,address } = req.body;
//         const newOrder = new orderModel({
//             userId:req.body.userId,
//             items:req.body.items,
//             amount:req.body.amount,
//             address:req.body.address,                        
//             })
                    
//             await newOrder.save();
            
//             await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});
//         const options = {
//             amount: Number(amount * 100),
//             currency: "INR",
//             receipt: crypto.randomBytes(10).toString("hex"),
//             notes: {
//                 items: JSON.stringify(items),
//                 address: JSON.stringify(address),
//                 user_id: userId   // Add the custom order ID
//             }
//         }
//         razorpayInstance.orders.create(options, (error, order) => {
//             if (error) {
//                 console.log(error);
//                 return res.status(500).json({ message: "Something Went Wrong!" });
//             }
//             res.status(200).json({ data: order });
//             console.log(order)
//         });

        
//     } catch (error) {
//         res.status(500).json({ message: "Internal Server Error!" });
//         console.log(error);
        
//     }
// }


// // const placeOrder = async (req,res) => {

// //     // const amount = req.body.amount;
// //     // const frontend_url = "http://localhost:5173";


    
// //     try {
        
// //         const newOrder = new orderModel({
// //             userId:req.body.userId,
// //             items:req.body.items,
// //             amount:req.body.amount,
// //             address:req.body.address,
            
// //         })
        
// //         await newOrder.save();
// //         await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});
        
        
        
// //         const options = {
// //             amount: req.body.amount*100, // amount in smallest currency unit
// //             currency: "INR",
// //             receipt: "receipt_order_74394",
// //         };
// //         console.log("io");

// //     razorpayInstance.orders.create(options, (error, order) => {
// //         if (error) {
// //             console.log(error);
// //             return res.status(500).json({ message: "Something Went Wrong!" });
// //         }
// //         res.status(200).json({ data: order });
// //         console.log(order)
// //     });


// //     } 
    
// //     catch (error) {
// //         res.status(500).json({ message: "Internal Server Error!" });

// //         console.log(error);
        
// //     }
// // }


// const verifyOrder = async (req, res) => {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature, } = req.body;

//     // console.log("req.body", req.body);

//     try {
//         // Create Sign
//         const sign = razorpay_order_id + "|" + razorpay_payment_id;

//         // Create ExpectedSign
//         const expectedSign = crypto.createHmac("sha256", process.env.SECRET_KEY)
//             .update(sign.toString())
//             .digest("hex");

//         // console.log(razorpay_signature === expectedSign);

//         // Create isAuthentic
//         const isAuthentic = expectedSign === razorpay_signature;
//         console.log("it ia auth"+ isAuthentic);
        

//         // Condition 
//         if (isAuthentic) {

//             const paymentDetails = await razorpayInstance.orders.fetch(razorpay_order_id);
//             const { userId } = JSON.parse(paymentDetails.notes); 
//             const amount = paymentDetails.amount / 100;
//             const receipt = paymentDetails.receipt;


//             const payment = new Payment({
//                 razorpay_order_id:razorpay_order_id,
//                 razorpay_payment_id:razorpay_payment_id,
//                 razorpay_signature:razorpay_signature,
//                 amount:amount,
//                 userId:userId,
//                 receipt:receipt,
                
//             });

//             // Save Payment 
//             await payment.save();
//             console.log("print it!!!!!!!!!!!!!!!!!");
            

            
//             // Send Message 
//             res.json({
//                 message: "Payement Successfully"
//             });
//         }
//         else{
//             console.log("fuck you");
            
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Internal Server Error!" });
//         console.log(error);
//     }
// }




// export {placeOrder,verifyOrder}


import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Payment from "../models/paymentModel.js";
import Razorpay from 'razorpay';
import 'dotenv/config';
import crypto from 'crypto';

// Initialize Razorpay instance with keys from environment variables
const razorpayInstance = new Razorpay({
    key_id: process.env.KEY_ID,  // Public key
    key_secret: process.env.SECRET_KEY  // Private key
});

// const testSavePayment = async () => {
//     const testPayment = new Payment({
//         razorpay_order_id: "test_order_123",
//         razorpay_payment_id: "test_payment_123",
//         razorpay_signature: "test_signature_123",
//         amount: 500,
//         userId: "test_user_123",
//         receipt: "test_receipt_123",
//     });

//     try {
//         const savedPayment = await testPayment.save();
//         console.log("Test Payment saved:", savedPayment);
//     } catch (error) {
//         console.error("Error saving test payment:", error);
//     }
// };



// Place order and initiate payment
const placeOrder = async (req, res) => {
    try {
        const { amount, userId, items, address } = req.body;

        // Create a new order in the database
        const newOrder = new orderModel({
            userId,
            items,
            amount,
            address,
        });
        await newOrder.save();
        // await newOrder.save();
            
        
        // Clear the user's cart after placing the order
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

        console.log("test");
        
        // testSavePayment();

        // await userModel.findByIdAndUpdate(userId, { cartData: {} });

        // Create Razorpay order options
        const options = {
            amount: Number(amount * 100), // Amount in smallest currency unit (paisa)
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),  // Random receipt ID
            notes: {
                items: JSON.stringify(items),
                address: JSON.stringify(address),
                user_id: userId,  // Add the custom user ID in notes
            },
        };

        // Create Razorpay order
        razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.error("Error creating Razorpay order:", error);
                return res.status(500).json({ message: "Something went wrong!" });
            }

            // Send the order details to the frontend for payment
            res.status(200).json({ data: order });
            console.log("Order created:", order);
        });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ message: "Internal server error!" });
    }
};

// Verify payment after user makes payment
// const verifyOrder = async (req, res) => {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

//     try {
//         // Create the string for signature verification
//         const sign = razorpay_order_id + "|" + razorpay_payment_id;
//         const expectedSign = crypto.createHmac("sha256", process.env.SECRET_KEY)
//             .update(sign.toString())
//             .digest("hex");

//         // Check if the payment signature matches the expected signature
//         const isAuthentic = expectedSign === razorpay_signature;

//         if (isAuthentic) {
//             // Fetch Razorpay order details
//             const paymentDetails = await razorpayInstance.orders.fetch(razorpay_order_id);
//             const { userId } = JSON.parse(paymentDetails.notes);
//             const amount = paymentDetails.amount / 100;  // Convert amount to INR
//             const receipt = paymentDetails.receipt;

//             // Create payment record
//             const payment = new Payment({
//                 razorpay_order_id,
//                 razorpay_payment_id,
//                 razorpay_signature,
//                 amount,
//                 userId,
//                 receipt,
//             });

//             // Save payment details in the database
//             await payment.save();
//             console.log("Payment saved successfully.");

//             // Respond with success message
//             res.json({ message: "Payment successful!" });
//         } else {
//             // Handle failed verification
//             console.error("Payment verification failed.");
//             res.status(400).json({ message: "Payment verification failed!" });
//         }
//     } catch (error) {
//         console.error("Error verifying payment:", error);
//         res.status(500).json({ message: "Internal server error!" });
//     }
// };

// const verifyOrder = async (req, res) => {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

//     try {
//         // Generate the expected signature
//         const sign = razorpay_order_id + "|" + razorpay_payment_id;
//         const expectedSign = crypto.createHmac("sha256", process.env.SECRET_KEY)
//             .update(sign.toString())
//             .digest("hex");

//         // Verify if the signature is valid
//         const isAuthentic = expectedSign === razorpay_signature;

//         if (isAuthentic) {
//             // Fetch payment details from Razorpay
//             const paymentDetails = await razorpayInstance.orders.fetch(razorpay_order_id);
//             const { userId } = JSON.parse(paymentDetails.notes); // Parse userId from notes
//             const amount = paymentDetails.amount / 100; // Convert amount to INR
//             const receipt = paymentDetails.receipt;

//             // Log received payment data
//             console.log("Received payment details: ", {
//                 razorpay_order_id,
//                 razorpay_payment_id,
//                 razorpay_signature,
//                 amount,
//                 userId,
//                 receipt,
//             });

//             // Save payment details to MongoDB
//             const payment = new Payment({
//                 razorpay_order_id,
//                 razorpay_payment_id,
//                 razorpay_signature,
//                 amount,
//                 userId,
//                 receipt,
//             });

//             // Save the payment
//             const savedPayment = await payment.save();
//             console.log("Payment saved:", savedPayment);

//             // Respond to the client
//             res.json({ message: "Payment successfully verified and saved!" });
//         } else {
//             res.status(400).json({ message: "Payment verification failed!" });
//         }
//     } catch (error) {
//         console.error("Error verifying payment: ", error);
//         res.status(500).json({ message: "Internal server error!" });
//     }
// };

// const crypto = require('crypto');

const verifyOrder = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  // Replace with your Razorpay secret key
  const secret = process.env.SECRET_KEY;

  // Create a signature string
  const checker = crypto.createHmac('sha256', secret);
  checker.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const generatedSignature = checker.digest('hex');

  console.log("generatedSignature");
  
  console.log(generatedSignature);
  console.log("razorpay_signature");
  
  console.log(razorpay_signature);
  
  

  // Verify the signature
  if (generatedSignature === razorpay_signature) {
    // Payment is verified
    console.log('Payment verified successfully');
    // Update your database or perform other actions
    console.log("dododododdododododododo");
    
    res.status(200).json({ message: 'Payment verified successfully' });
  } else {
    // Payment verification failed
    console.log('Payment verification failed');
    res.status(400).json({ message: 'Payment verification failed'   });
  }
};

// module.exports = verifyPayment;

export { placeOrder, verifyOrder };
