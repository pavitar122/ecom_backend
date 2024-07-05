import { comparePassword, hashPassword } from "../config/hashing.js"
import { generateToken } from "../config/jwt.js"
import User from "../database/models/userModel.js"


export const register = async (req, res) => {
    const { name, email, password, cpassword } = req.body

    try {
        if (!name || !email || !password || !cpassword) {
            return res.status(400).send("Fill all the required Fields.")
        }

        if (password !== cpassword) {
            return res.status(400).send("Password and confirm password do not match.")
        }
        const userExsist = await User.findOne({ email: email })
        if (userExsist) {
            return res.status(400).send("Email already used type another email")
        }
        const hashedPassword = await hashPassword(password);

        const newUser = await User.create({
            name: name,
            email: email,
            password: hashedPassword
        })

        const sendUser = {
            name: newUser.name,
            email: newUser.email,
            token: generateToken(newUser._id)
        }

        res.status(200).json({ sendUser })

    } catch (error) {
        res.status(500).send(error)
    }

}


export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).send("Fill all the required Fields.")
        }
        const userExsist = await User.findOne({ email: email })

        if (!userExsist) {
            return res.status(400).json("Wrong credentials entered.")
        }
        const isMatch = await comparePassword(password, userExsist.password);

        if (!isMatch) {
            return res.status(400).send("Password entered is wrong.")
        }

        const sendUser = {
            name: userExsist.name,
            email: userExsist.email,
            token: generateToken(userExsist._id)
        }
        res.status(200).json(sendUser)

    } catch (error) {
        res.status(500).send(error)
    }
}



export const fetchUsers = async (req, res) => {
    const decodedId = req.user.id
    const findUser = await User.findOne({_id: decodedId})

    if(findUser.name !== "admin"){
        return res.status(400).json("Login as admin to access.")
    }
    try {
        const allUsers = await User.find( {_id: { $ne: decodedId }});
        res.status(200).json({ allUsers })
    } catch (error) {
        res.status(500).send(error)
    }
}


export const deleteUser = async (req, res) => {
    const id = req.params.id;
    const decodedId = req.user.id;

    const findUser = await User.findOne({_id: decodedId})

    if(findUser.name !== "admin"){
        return res.status(400).json("Login as admin to access.")
    }
    
    try {
        const deleteUser = await User.findOneAndDelete({ _id: id })
        res.status(200).json({deleteUser})
    } catch (error) {
        res.status(500).send(error)
    }

}
