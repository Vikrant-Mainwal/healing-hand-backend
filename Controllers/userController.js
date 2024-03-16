import User from "../models/UserSchema.js";

export const updateUser = async(req,res) =>{
    const id = req.params.id

    try {
        const updatedUser = await User.findByIdAndUpdate(id, {$set:req.body}, {new:true})

        res.status(200).json({sucess:true, message:"Sucessfully Updated" , data:updatedUser})

    } catch (error) {
        res.status(500).json({sucess:false, message:"Fail to Updated"})
    }
}

export const deleteUser = async(req,res) =>{
    const id = req.params.id

    try {
        await User.findByIdAndDelete(id)

        res.status(200).json({sucess:true, message:"Sucessfully Deleted" , data:updateUser})

    } catch (error) {
        res.status(500).json({sucess:false, message:"Fail to delete"})
    }
}

export const getSingleUser = async(req,res) =>{
    const id = req.params.id

    try {
        const user = await User.findById(id).select("-password")

        res.status(200).json({sucess:true, message:"user found" , data:user})

    } catch (error) {
        res.status(404).json({sucess:false, message:"no user found"})
    }
}

export const getAllUser = async(req,res) =>{
    

    try {
        const users = await User.find({}).select("-password")

        res.status(200).json({sucess:true, message:"users found" , data:users})

    } catch (error) {
        res.status(404).json({sucess:false, message:"not found"})
    }
}