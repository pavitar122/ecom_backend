import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "https://res.cloudinary.com/dflkzguu6/image/upload/v1718719676/nxicbicrgjsy1zqtdkwm.jpg"
    }
})

const Product = mongoose.model('Product', productSchema);

export default Product;