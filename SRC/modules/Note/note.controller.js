import noteModel from "../../../DB/models/note.model.js"

export const addNote=async(req, res, next)=>{
    const user=req.authuser
    const {title,desc}=req.body
    try{
        let note = new noteModel({ title, desc, addedBy: user._id });
        await note.save();
        note = await note.populate("addedBy","name email");
        res.status(201).json({message:"Note added successfully",note})
    }catch(error){
        return res.status(500).json({message:"error", error: error.message})
    }
}

export const getNotes=async(req, res, next)=>{
    try{
        const {id}=req.authuser
        const notes=await noteModel.find({addedBy:id}).populate({path:'addedBy',select:'name email -_id'});
        res.status(200).json({success:true,message:"notes fetched successfully",notes});
    }catch(err){
        console.log(err);
        res.status(500).json({success:false,message:"server error"});
    }
}

export const updateNote=async(req, res, next)=>{
    try{
        const {token}=req.headers;
        const {id}=req.params;
        const {title,desc}=req.body;
        
        const user=jwt.verify(token, process.env.JWT_SECRET);

        const updatedNote=await noteModel.findOneAndUpdate(
            {_id:id,addedBy:user.id},
            {title,desc},
            {new:true}
        );

        if(!updatedNote) 
            return res.status(404).json({success:false,message:"note not found"});

        res.status(200).json({success:true,message:"note updated successfully",updatedNote});
    }catch(err){
        console.log(err);
        res.status(500).json({success:false,message:"server error"});
    }
}
export const uploadFile=async(req, res, next)=>{
    res.status(200).json({success:true,message:"file uploaded successfully",file:req.file});
}