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
    const frontend_url = "http://localhost:5173"
    // try {
    //     const newOrder = new orderModel({
    //         userId:req.body.userId,
    //         items:req.body.items,
    //         address:req.body.address,

    //     })

    //     await newOrder.save();
    //     await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

    //     const line_items = req.body.items.map((item) => ({
    //             price_data: {
    //                 currency: "INR",
    //                 product_data: {
    //                     name: item.name,
    //                 },
    //                 unit_amount: item.price * 100, // Razorpay expects amount in paise (smallest unit)
    //             },
    //             quantity: item.quantity , // Ensure quantity is included, or default to 1 if not specified
            
    //     }));

    //     line_items.push({
    //         price_data:{
    //             currency:"INR", 
    //             product_data:{
    //                 name: "Delivery Charges"
    //             },
    //             // 30rs delivery charges

    //             unit_amount:30*100
    //         },
    //         quantity:1

    //     })


        

    //     const session = await stripe.checkout.sessions.create({
    //         line_items:line_items,
    //         mode:paymentLink,
    //         success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
    //         cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`

    //     })





    // } 


    
    try {
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address,
           
        })

        await newOrder.save();
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

                unit_amount:30*100
            },
            quantity:1

        })


        

        // const session = await stripe.checkout.sessions.create({
        //     line_items:line_items,
        //     mode:paymentLink,
        //     success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
        //     cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`

        // })
        const totalAmountInPaise = line_items.reduce((total, item) => {
          return total + (item.price_data.unit_amount * item.quantity);
      }, 0);


      const totalAmountInINR = totalAmountInPaise / 100;


      const options = {
        amount: totalAmountInPaise, // amount in smallest currency unit
        currency: "INR",
        receipt: "receipt_order_74394",
    };


    const order = await instance.orders.create(options);

        if (!order) return res.status(500).send("Some error occured");

        res.json(order);





    } 
    
    catch (error) {
        console.log(error);
        
    }
}





export {placeOrder}


