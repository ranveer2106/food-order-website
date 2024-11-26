import jwt from "jsonwebtoken"

const authMiddleware = async (req,res,next)=> {
    const {token} = req.headers;
    if(!token){
        return res.json({success:false,message:"Not authorized in login again"})
    }
    try {
        const token_decode = jwt.verify(token,process.env.JWT_SECRET); 
        req.body.userId = token_decode.id;
        // console.log("yooyoy");
        
        next();
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"ERROR"})
        
    }
}

export default authMiddleware;