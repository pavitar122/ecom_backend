import Product from "../database/models/productModel.js"
import User from "../database/models/userModel.js"

export const addProduct = async (req, res) => {
    try {
        const decodedId = req.user.id;
        const product = req.params.product;
        const { name, price, image } = req.body;

        const isAdmin = await User.findOne({ _id: decodedId })

        if (isAdmin.name !== "admin") {
            return res.status(400).json({ msg: "Login as admin" })
        }

        const newProduct = await Product.create({
            name: name,
            category: product,
            price: price,
            image: image
        })

        res.status(200).json({ newProduct })
    } catch (error) {
        res.status(500).send(error)
    }

}

export const fetchProducts = async (req, res) => {
    const category = req.params.category;
    try {
        const listofProducts = await Product.find({ category: category })

        res.status(200).json(listofProducts)

    } catch (error) {
        res.status(500).send(error)
    }

}



export const deleteProduct = async (req, res) => {
    const id = req.params.id;
    const decodedId = req.user.id;

    const findUser = await User.findOne({ _id: decodedId })

    if (findUser.name !== "admin") {
        return res.status(400).json("Login as admin to access.")
    }

    try {
        const deleteProduct = await Product.findOneAndDelete({ _id: id })
        res.status(200).json({ deleteProduct })
    } catch (error) {
        res.status(500).send(error)
    }

}


