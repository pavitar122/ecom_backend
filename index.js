import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import "./database/connection/connect.js"

import userRoutes from "./routes/userRoutes.js"
import productRoutes from "./routes/productroute.js"
import OrderRoutes from "./routes/orderRoutes.js"

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000

app.use("/user", userRoutes)

app.use("/product", productRoutes)

app.use("/order", OrderRoutes)


app.listen(PORT, ()=>{
    console.log(`Your app is running on ${PORT}`)
})