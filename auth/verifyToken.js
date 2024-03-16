import jwt from 'jsonwebtoken'
import Doctor from '../models/DoctorSchema.js'
import User from '../models/UserSchema.js'


export const authenticate = async (req, res, next)=>{
    // get token from header
    const authToken = req.headers.authorization

    // Bearer actual token then check token exist or not 
    if(!authToken || !authToken.startsWith('Bearer')){
        return res.status(401).json({success:false, message:"not valid token"})
    }

    try {
        const token = authToken.split('')[1];
    //    verify tocken
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    
    req.userId = decoded.id
    req.role = decoded.role

    next();//must be call 
        
    } catch (error) {
        if(error.name === "TokenExpiredError"){
            return res.status(401).json({message:"token is expire"})
        }
        return res.status(401).json({success:false,message:" invalid token"})
    }
}

export const restrict = roles => async(req,res,next)=>{
    const userId = req.userId
    let user;

    const patient = await User.findById(userId)
    const doctor = await Doctor.findById(userId)

    if(patient){
        user= patient
    }
    if(doctor){
        user= doctor
    }

    if(!roles.includes(user.role)){
        return res.status(401).json({success:false, message:"you are not authorize"})
    }
    next();
}