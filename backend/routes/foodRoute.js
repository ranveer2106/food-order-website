import express from "express"
import multer from "multer"
import fs from "fs";
import { addFood } from "../controllers/foodController.js"

const foodRouter = express.Router();




const storage = multer.diskStorage({
    destination: (req, file, cb) => {
    //     const uploadDir = './uploads';
    //   if (!fs.existsSync(uploadDir)) {
    //     fs.mkdirSync(uploadDir); // Create the folder if it doesn't exist
    //   }
        cb(null, 'uploads/'); // Specify the folder to store uploaded files
    },
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`);
    }
})


const upload = multer({storage:storage});



foodRouter.post("/add", upload.single("image"),addFood)



export default foodRouter;

// image storage engine

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       // Set file upload destination folder
//       const uploadDir = './uploads';
//       if (!fs.existsSync(uploadDir)) {
//         fs.mkdirSync(uploadDir); // Create the folder if it doesn't exist
//       }
//       cb(null, uploadDir); // Specify destination folder
//     },
//     filename: (req, file, cb) => {
//       // Set file name to be unique by adding timestamp
//       cb(null, Date.now() + path.extname(file.originalname));
//     },
//   });
  
//   // Create Multer instance with storage configuration
//   const upload = multer({ storage });
