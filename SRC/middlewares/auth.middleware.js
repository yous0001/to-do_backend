import jwt from "jsonwebtoken"
import userModel from "../../DB/models/user.model.js"
import { systemRoles } from './../utils/systemRoles.js';

export const auth=(authorizedRoles=Object.values(systemRoles))=>{
    return async (req, res, next) => {
        const {accesstoken}=req.headers
        try{
            //check if the token is present
            if(!accesstoken) {
                return res.status(400).json({message:"token is required"})
            }
            //check if the token has valid prefix
            if(!accesstoken.startsWith(process.env.JWT_PREFIX)){
                return res.status(400).json({message:"invalid token prefix"})
            }
            //split the prefix into the token
            const token=accesstoken.split(process.env.JWT_PREFIX)[1]
            //decode the token and get the user data from the payload
            const data=jwt.decode(token,process.env.JWT_SECRET)
            //check the decodded data
            if(!data?.id){
                return res.status(400).json({message:"invalid token payload"})
            }
            const user=await userModel.findById(data.id)
            if(!user){
                return res.status(404).json({message:"user not found"})
            }
            //check if the user has the required role to access the requested resource(authorization)
            if(!authorizedRoles.includes(user.role)){
                return res.status(401).json({message:"unauthorized access"})
            }
            //attach the user data to the request
            req.authuser=user;
            next();
        }catch(error){
            return res.status(500).json({message:"error", error: error.message})
    }
}
}