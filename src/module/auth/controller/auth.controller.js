import userModel from "../../../../DB/model/user.model.js"
import { generateToken, verifyToken } from "../../../Services/generateAndVerify.js";
import { compare, hash } from "../../../Services/hashAndCompare.js";
import { signupSchema,signinSchema } from "../auth.validation.js";
import { sendEmail } from '../../../Services/sendEmail.js';

export const signup =async (req,res)=>{
    const {userName,email,password}=req.body;
    const token = generateToken({email},process.env.EMAIL_TOKEN);
    const link =`http://localhost:3001/auth/confirmEmail/${token}`
    
    const user = await userModel.findOne({email});
    if(user){
        return res.status(409).json({message:"email already exists"});
    }

    const hashPassword =hash(password);
    sendEmail(email,"confirm email",`<a href="${link}">verify your email </a>`);
    const createUser = await userModel.create({userName,email,password:hashPassword});
    return res.status(201).json({meessage:"done",user:createUser._id});
}

export const signin = async(req,res)=>{
    
    const {email,password}=req.body;

    const user = await userModel.findOne({email});
    if(!user.confirmEmail){
        return res.json({message:"u must confirm your email"});
    }
    if(!user){
        return res.status(404).json({message:"email ont exists"});
    }
    else{
        const match = compare(password,user.password);
        if(!match){
            return res.json({message:"invalid password"});
        }else{
            const token = generateToken({id:user._id});
            return res.status(200).json({message:"done",token});
        }
    }
}

export const confirmEmail = async(req,res)=>{
    const {token}=req.params;
    const decoded = verifyToken(token,process.env.EMAIL_TOKEN);
    const user = await userModel.updateOne({email:decoded.email},{confirmEmail:true});
    return res.json({message:"done"});
}