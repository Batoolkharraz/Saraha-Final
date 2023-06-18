import userModel from "../../../../DB/model/user.model.js";
import { verifyToken } from "../../../Services/generateAndVerify.js";
import cloudinary from "../../../Services/cloudinary.js";
export const profile=async (req,res)=>{

    try{
    return res.json("profile");
    }
    catch(error){
        return res.json({message:"catch error",error:error.stack});
    }

}

export const profilePic= async (req,res)=>{
    if(!req.file){
        return res.json({message:"file is required"});
    }
    const {secure_url} = await cloudinary.uploader.upload(req.file.path,{folder:`saraha/user/${req.id}`});
    const user = await userModel.updateOne({_id:req.id},{profImg:secure_url});
    return res.status(200).json({message:"profile updated successfully!!"});
}