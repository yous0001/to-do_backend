import multer from "multer";
import fs from "fs";
import path from "path";
import {DateTime} from "luxon";
import { nanoid } from "nanoid";
import { allowedExtensions } from './../utils/allowedExtenstions.js';
// Multer middleware to handle file uploads
export const multerMiddlewareLocal = ({filepath="general",allowedExtensions}={})=>{
    
    const destinationpath=path.resolve(`SRC/uploads/${filepath}`)//path.resolve is to avoid circular dependency (get the full path)
    // Create directory if it doesn't exist
    if (!fs.existsSync(destinationpath)){
        fs.mkdirSync(destinationpath,{recursive:true});
    }
    // Multer configuration to handle file uploads
    const storage = multer.diskStorage({
        // Save files in the specified directory with a unique filename
        destination:  (req, file, cb)=>{
            cb(null, destinationpath);//cb is a callback function like next() which takes Error,path
        },
        filename: (req, file, cb)=>{
            cb(null, DateTime.now().toFormat("dd-MMMM-yyyy") +
            "___"+
            nanoid(8)+
            "___"+
            file.originalname);//we have to rename the file to avoid overwriting here we write the date,unique,file original name
        }
    });

    //filteration
    const fileFilter=(req, file, cb)=>{
        /* Accept only files that match the conditions(
            if cb(null, true) allow file to be saved
            if cb(null, false) reject file to be saved)*/

            //file.mimitype holds the Mime type of the file 
            //file.mimitype will be like this "image/png" and "image/jpeg"
            //split('/')[1] will get the extension from the mime type
        if(allowedExtensions.includes(file.mimetype.split('/')[1])){
            return cb(null, true);
        }else{
            return cb(new Error('Invalid file type.'), false);
        }
    };

    const upload=multer({storage:storage,fileFilter:fileFilter});//multer can take a storage and filter function like that 
    //or it can take a dest directly 
    return upload;
}


export const multerMiddlewareHost= ({allowedExtensions=allowedExtensions.image})=>{
    const storage=multer.diskStorage({});
    const fileFilter=(req,file,cb)=>{
        if(allowedExtensions.includes(file.mimetype.split("/")[1])) return cb(null,true); 
        else return cb(new Error('Invalid file type.'),false); 
    }
    return multer({storage,fileFilter})
}