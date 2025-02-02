import { model,Schema } from "mongoose";
import mongoose from "mongoose";
import { systemRoles } from "../../SRC/utils/systemRoles.js";

const userSchema=new Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true 
    },
    isConfirmed:{
        type:Boolean,
        default:false
    },
    gender:{
        type:String,
        enum:['male','female']
    },
    intrests:{
        type: [String],
        default:[]
    },age:Number,
    isLoggedIn:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        enum:Object.values(systemRoles),
        default:'user'
    },
    profileImage:{
        secure_url:{type:String}
        ,public_id:{type:String,unique:true}
    }
},{
    timestamps:true
});



export default mongoose.models.User|| model("User",userSchema);