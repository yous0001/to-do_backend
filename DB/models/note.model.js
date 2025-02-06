import mongoose from "mongoose";
const {Schema,model,Types}=mongoose

const NoteSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    desc:String,
    completed:{
        type:Boolean,
        default:false
    },
    addedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},{
    timestamps:true
})

export default mongoose.models.Note || model('Note',NoteSchema);