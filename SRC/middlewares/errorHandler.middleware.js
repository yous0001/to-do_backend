export const errorHandler=(API)=>{
    return async (req, res, next)=>{
        API(req, res, next).catch((err)=>{
            console.log(err);
            // res.status(500).json({
            //     success:false,
            //     message:"server error",
            //     error:err.message
            // })
            return new Error("Internal server error",{cause:500})
        })
    }
}

export const globalResponce = (err,req, res, next)=>{
    if(err) {
        return res.status(err["cause"] || 500).json({
            success:false,
            message:"server error",
            error:err.message
        });
    }
}