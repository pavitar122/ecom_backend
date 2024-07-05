import express from "express";
import { verifyToken } from "../config/jwt.js";
import { addProduct, deleteProduct, fetchProducts} from "../controllers/productController.js";


const route = express.Router();


route.post("/addProduct/:product", verifyToken, addProduct)

route.get("/fetchProducts/:category", fetchProducts)

route.delete("/deleteProduct/:id", verifyToken, deleteProduct)



export default route;