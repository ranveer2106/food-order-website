import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://ranvirbhatti2106:ranvirbhatti2106@cluster0.0559m.mongodb.net/food-delivery').then(()=>console.log("DB connected"));
}