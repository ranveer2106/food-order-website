import foodModel from "../models/foodModel.js";
import fs from "fs";
import 'dotenv/config';
import { v2 as cloudinary } from 'cloudinary'


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET_KEY_CLOUDINARY
});



const addFood = async (req, res) => {
    try {
      // Check if file is uploaded
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
  
      // Upload image to Cloudinary using the 'uploader.upload' method, not upload_stream
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: 'auto', // Automatically detect the file type (image, video, etc.)
      });
  
      // Now the result contains the Cloudinary URL, so you can use it
      const imageUrl = result.secure_url;
      console.log(imageUrl); // Log the Cloudinary image URL

      fs.unlink(req.file.path, (err) => {
        if (err) {
            console.error("Failed to delete the local file:", err);
        }
    });
  
      // Create new food item in the database with the Cloudinary URL
      const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: imageUrl, // Store the image URL
      });
  
      // Save food item to the database
      await food.save();
  
      // Send a success response back to the client
      res.status(200).json({ success: true, message: 'Food Added', data: food });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error while adding food', error: error.message });
    }
  };



// all food list
const listFood = async(req,res) =>{
    try {
        const foods = await foodModel.find({});
        res.json({success:true,data: foods})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}

// remove food item

const removeFood = async (req,res) => {
    try {
        const food = await foodModel.findById(req.body.id);        
         fs.unlink(`uploads/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food removed"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }

}



export {addFood,listFood,removeFood}