import mongoose from "mongoose";
import {createHmac} from "crypto";
import { v4 as uuidv4} from "uuid";
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    salt:{
        type: String
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: Number,
        default: 0
    }
}, {timestamp: true});
userSchema.methods = {
    authenticate(password){
        return this.password == this.encryptPassword(password);
    },
    encryptPassword(password){
         if(!password) return;
         try {
             return createHmac('sha256', this.salt).update(password).digest('hex');
         } catch (error) {
            console.log(error) 
         }
    }
}
userSchema.pre("save", function(next){
    console.log(1);
    try {
        this.salt = uuidv4();
        this.password = this.encryptPassword(this.password);
        return next();
    } catch (error) {
         return next(error)
    }
});
export default mongoose.model('User', userSchema);