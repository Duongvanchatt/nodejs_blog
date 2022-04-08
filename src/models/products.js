import mongoose  from "mongoose";
const { ObjectId } = mongoose.Types;

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    slug: {
        type: String,
        lowercase: true,
        unique: true,
        index: true
    },
    price:{
        type: Number,
        required: true
    },
    desc:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    category: {
        type: ObjectId,
        ref: "Category"
    }
}, {timestamps: true})
export default mongoose.model('products', productSchema);