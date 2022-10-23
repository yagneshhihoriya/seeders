module.exports = (req,res,next) =>{
    if(req.isAdmin){
        next()
    }else{
        return res.status(403).json({success:false,message:"Permission Denied"})
    }
}