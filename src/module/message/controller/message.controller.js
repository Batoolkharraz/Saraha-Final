import userModel from "../../../../DB/model/user.model.js";
import messageModel from "../../../../DB/model/message.model.js"

export const getMassage=async (req,res)=>{
    const messageList = await messageModel.find({receiverId:req.id});
    return res.json({message:"success",messageList});
}

export const sendMassage=async (req,res)=>{
    const {receiverId}=req.params;
    const {message}=req.body;
 
    //return res.json(message);
    const user =await userModel.findById(receiverId);
    //return res.json(user);
    if(!user){
        return res.status(404).json({message:"user not found"});
    }

    const createMassage = messageModel.create({receiverId,message});
    return res.json({message:'succecc',createMassage});

}

export const deleteMessage = async (req,res)=>{
    
    const id = req.id;
    const {messageId}= req.params;

    //return res.json(id);
    const message=await messageModel.deleteOne({_id:messageId,receiverId:id});
    if(message.deletedCount==0){
        return res.status(400).json({message:"invalid user id or message id"});
    }
    return res.json({message:"success"});
}