import { v2 as cloudinary } from "cloudinary";


export const cloudinaryConfig=()=>{
    cloudinary.config({
        cloud_name: process.env.Cloud_name ,
        api_key: process.env.API_key,
        api_secret: process.env.API_secret
    })
    return cloudinary;
}

export const uploadTest=async(req,res)=>{
    //test connection with ping to ensure connection is established
    const data=await cloudinaryConfig().uploader.upload("https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",
        {
            folder:"test",  //path on cloudinary server
            //public_id: "public_id_1", //public id on cloudinary(it can be make dynamic without it )
            resource_type:"auto",   //recource type (image or video .....)
            use_filename:true, //use original filename instead of public id
            //unique_filename:false, //disable unique string that will be added to filename
            tags:["cloud","image","external"]//tags that can be added to file which can enable access with it (get image tags/delete external tags)
            
        }
    )
    res.json({
        data
    })
}