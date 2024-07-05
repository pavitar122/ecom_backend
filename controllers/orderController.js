import Order from "../database/models/orderModel.js"

export const newOrder = async (req, res) => {
    const decodedId = req.user.id;
    const { address, products } = req.body;
    try {
        const newOrder = await Order.create({
            user: decodedId,
            address: address,
            products: products
        });

        res.status(200).json(newOrder)
    } catch (error) {
        res.status(500).send(error)
    }
}

export const getOrder = async (req, res) => {
    const decodedId = req.user.id;
    try {
        const order = await Order.find({ user: decodedId })
            .populate("user")
            .populate("products.product")

            console.log(order)

        if(order.length === 0){
            return res.status(400).json({message: "There are not any orders placed yet."})
        }

        res.status(200).json( order )

    } catch (error) {
        res.status(500).send(error)
    }


}