import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        default : "https://res.cloudinary.com/dflkzguu6/image/upload/v1718719676/nxicbicrgjsy1zqtdkwm.jpg"
    }
})

const User = mongoose.model('User', userSchema);

export default User;