import userModel from "../../../DB/models/user.model.js";
import bcrypt from "bcryptjs"
import { sendEmailService } from './../Services/sendEmail.js';
import jwt from "jsonwebtoken";
import { verificationEmailTemplate } from "../Services/emailTemplates.js";
import { cloudinaryConfig } from './../../utils/cloudinary.utils.js';

export const signup=async(req,res,next)=>{
    const {email,password,name,gender,intrests,age}=req.body;
    
    try {
        const isEmailExists=await userModel.findOne({email})
        if(isEmailExists){
            return res.status(400).json({message:"Email already exists"})
        }
        
        const hashedPassword=await bcrypt.hash(password,10)
        const userObject={
            email,
            password:hashedPassword,
            name,
            gender,
            intrests,
            age
        }
        const user=new userModel(userObject)
        const verificationToken=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'});
        const verificationLink=`${req.protocol}://${req.headers.host}/user/verify/${verificationToken}`

        const isEmailSent=await sendEmailService({
            to:user.email,
            subject:"Verify your email",
            html:verificationEmailTemplate.replace("{{verification_link}}",verificationLink)
        })

        if(isEmailSent.rejected.length) {
            return res.status(500).json({ success: false, message: "failed to send email" });
        }

        await user.save()
        user.password="hidden"
        res.status(201).json({message:"User created successfully",user})
    } catch (error) {
        return res.status(500).json({message:"error", error:error.message})
    }
    
}

export const verifyEmail=async(req,res,next)=>{
    try{
        const {token}=req.params
        const decodedToken=jwt.verify(token,process.env.JWT_SECRET)
        const user=await userModel.findById(decodedToken.id)
        if(user.isConfirmed){
            return res.status(400).json({message:"Email already verified"})
        }
        user.isConfirmed=true
        await user.save()
        return res.status(200).json({message:"Email verified successfully"})
    }catch (error) {
        return res.status(500).json({message:"error", error:error.message})
    }
}

export const signin=async(req,res,next)=>{
    try{
        const {email,password}=req.body
        const user=await userModel.findOne({email})
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        const isPasswordMatch=await bcrypt.compare(password,user.password)
        if(!isPasswordMatch){
            return res.status(400).json({message:"Invalid password"})
        }
        if(!user.isConfirmed){
            return res.status(400).json({message:"Email not verified"})
        }
        user.isLoggedIn=true;
        await user.save();
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'})
        return res.status(200).json({message:"User logged in successfully",token})
    }catch (error) {
        return res.status(500).json({message:"error", error:error.message})
    }
}

export const getUser=async(req,res,next)=>{
    try{
        const {id}=req.authuser
        const user=await userModel.findById(id)
        
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        user.password="hidden"

        return res.status(200).json({message:"User fetched successfully",user})

    }catch (error) {
        return res.status(500).json({message:"error", error:error.message})
    }
}

export const logout=async(req,res,next)=>{
    try{
        const {id}=req.authuser
        const user=await userModel.findById(id)
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        user.isLoggedIn=false;
        await user.save();
        return res.status(200).json({message:"User logged out successfully"})
    }catch (error) {
        return res.status(500).json({message:"error", error:error.message})
    }
}

export const uploadImg = async  (req, res, next)=> {
    const {_id}=req.authuser
    const data=await cloudinaryConfig().uploader.upload(req.file.path,
        {
            folder:"test",  
            resource_type:"image",  
            use_filename:true, 
            tags:["cloud","image","internal"]
        })
        const user=await userModel.findByIdAndUpdate(_id,{profileImage:{secure_url:data.secure_url,public_id:data.public_id}}, {new: true})
        res.json({message:"success",user});
};

export const deleteImg = async  (req, res, next)=> {
    const user=req.authuser //get user from auth module
    const data=await cloudinaryConfig().uploader.destroy(user.profileImage.public_id)//delete image with public id that stored in user collection
    if(data.result!='ok')//check if image deleted
        return res.status(400).json({message:"error", error:data.result})
    const updatedUser=await userModel.findByIdAndUpdate(user._id,{profileImage:{secure_url:null,public_id:null}}, {new: true})
    res.json({message:"success",user:updatedUser});
}

export const deleteImgs = async  (req, res, next)=> {
    const {ids}=body.query
    const data=await cloudinaryConfig().api.delete_resources(ids)//delete bulk image with public id 
    if(data.result!='ok')
        return res.status(400).json({message:"error", error:data.result})
    const updatedUser=await userModel.findByIdAndUpdate(user._id,{profileImage:{secure_url:null,public_id:null}}, {new: true})
    res.json({message:"success",user:updatedUser});
}
