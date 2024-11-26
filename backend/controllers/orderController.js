// import orderModel from "../models/orderModel.js";
// import userModel from "../models/userModel.js";
// import Razorpay from 'razorpay';
import 'dotenv/config';

// // import items from "razorpay/dist/types/items.js";



// // placing user order for frontend 


// const razorpay = new Razorpay({
//     key_id: process.env.KEY_ID,  // Public key
//     key_secret: process.env.SECRET_KEY  // Private key
// });


// const placeOrder = async (req,res) => {
//     const frontend_url = "http://localhost:5173"
//     try {
//         const newOrder = new orderModel({
//             userId:req.body.userId,
//             items:req.body.items,
//             address:req.body.address,

//         })

//         await newOrder.save();
//         await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

//         const line_items = req.body.items.map((item) => ({
//                 price_data: {
//                     currency: "INR",
//                     product_data: {
//                         name: item.name,
//                     },
//                     unit_amount: item.price * 100, // Razorpay expects amount in paise (smallest unit)
//                 },
//                 quantity: item.quantity , // Ensure quantity is included, or default to 1 if not specified
            
//         }));

//         line_items.push({
//             price_data:{
//                 currency:"INR", 
//                 product_data:{
//                     name: "Delivery Charges"
//                 },
//                 // 30rs delivery charges

//                 unit_amount:30*100
//             },
//             quantity:1

//         })


        

//         const session = await stripe.checkout.sessions.create({
//             line_items:line_items,
//             mode:paymentLink,
//             success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
//             cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`

//         })





//     } catch (error) {
//         console.log(error);
        
//     }
// }





// export {placeOrder}


import razorpay from "razorpay";
import orderModel from "../models/orderModel.js";  // Assuming you have this model
import userModel from "../models/userModel.js";  // Assuming you have this model

// Initialize Razorpay client with your key and secret
const razorpayInstance = new razorpay({
    key_id: process.env.KEY_ID,  // Public key
    key_secret: process.env.SECRET_KEY  // Private key
});

const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173"; // Your frontend URL
  try {
    // Create a new order in the database
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      address: req.body.address,
    });

    await newOrder.save();  // Save the order to the database

    // Clear the user's cart after placing the order
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // Prepare the line items for Razorpay order
    const line_items = req.body.items.map((item) => ({
      name: item.name,
      description: item.description || "",
      amount: item.price * 100, // Razorpay expects amount in paise (smallest unit)
      currency: "INR",
      quantity: item.quantity || 1, // Ensure quantity is included, or default to 1
    }));

    // Add delivery charges
    line_items.push({
      name: "Delivery Charges",
      description: "Delivery fee for your order",
      amount: 30 * 100, // Delivery charges in paise
      currency: "INR",
      quantity: 1,
    });

    // Calculate the total amount for the order
    const totalAmount = line_items.reduce((sum, item) => sum + item.amount * item.quantity, 0);

    // Create a Razorpay order
    const orderOptions = {
      amount: totalAmount, // Total amount in paise
      currency: "INR",
      receipt: `order_rcptid_${Date.now()}`, // Unique receipt ID
      notes: { items: JSON.stringify(line_items) }, // Optional metadata
    };

    const razorpayOrder = await razorpayInstance.orders.create(orderOptions);

    // Check if the Razorpay order was created successfully
    if (!razorpayOrder) {
      return res.status(500).json({ message: "Failed to create Razorpay order" });
    }

    // Send the Razorpay order ID to the frontend
    res.status(200).json({
      success: true,
      order_id: razorpayOrder.id,
      amount: razorpayOrder.amount,
    });
    
  } catch (error) {
    console.log("Error placing order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { placeOrder };
