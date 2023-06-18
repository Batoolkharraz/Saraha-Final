import mongoose, { Schema,model } from "mongoose";

const userSchema = new Schema({
    userName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    confirmEmail:{
        type:Boolean,
        default:false,
    },
    profImg:{
        type:String,
    }
},{
    timestamps:true
})

const userModel = mongoose.models.user || model('user',userSchema);
export default userModel;
