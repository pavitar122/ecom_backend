import express from "express";
import { getOrder, newOrder } from "../controllers/orderController.js";
import { verifyToken } from "../config/jwt.js";


const route = express.Router();


route.post("/placeOrder" , verifyToken , newOrder)

route.get("/fetchOrder",verifyToken , getOrder)


export default route;