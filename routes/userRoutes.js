import express from "express";
import { deleteUser, fetchUsers, login, register } from "../controllers/userControllers.js";
import { verifyToken } from "../config/jwt.js";

const route = express.Router();

route.post("/register", register)

route.post("/login", login)

route.get("/fetchUsers", verifyToken, fetchUsers)

route.delete("/deleteUser/:id",verifyToken, deleteUser)



export default route;