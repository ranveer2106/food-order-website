import express from "express"
import { placeOrder } from "../controllers/orderController.js"
import authMiddleware from "../middleware/auth.js"


const orderRouter = express.Router();

orderRouter.post("/place",authMiddleware,placeOrder);

export default orderRouter;

// import express from "express";
// import { placeOrder } from "../controllers/orderController.js";

// const orderRouter = express.Router();

// // Remove the authMiddleware from this route
// orderRouter.post("/place", placeOrder);

// export default orderRouter;
