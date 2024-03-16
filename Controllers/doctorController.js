import Doctor from "../models/DoctorSchema.js";

export const updateDoctor = async(req,res) =>{
    const id = req.params.id

    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(id, {$set:req.body}, {new:true})

        res.status(200).json({sucess:true, message:"Sucessfully Updated" , data:updatedDoctor})

    } catch (error) {
        res.status(500).json({sucess:false, message:"Fail to Updated"})
    }
}

export const deleteDoctor = async(req,res) =>{
    const id = req.params.id

    try {
        await Doctor.findByIdAndDelete(id)

        res.status(200).json({sucess:true, message:"Sucessfully Deleted" , data:updateDoctor})

    } catch (error) {
        res.status(500).json({sucess:false, message:"Fail to delete"})
    }
}

export const getSingleDoctor = async(req,res) =>{
    const id = req.params.id

    try {
        const doctor = await Doctor.findById(id).populate('reviews').select("-password")

        res.status(200).json({sucess:true, message:"Doctor found" , data:doctor})

    } catch (error) {
        res.status(404).json({sucess:false, message:"no Doctor found"})
    }
}

export const getAllDoctor = async(req,res) =>{
    

    try {

        const {query} = req.query
        let doctors;

        if(query){
            doctors = await Doctor.find({isApproved:'approved', $or:[{name:{$regex:query, $options:'i'}},{specialization:{$regex:query, $options:'i'}}]}).select("-password")
        }else{
             doctors = await Doctor.find({isApproved:'approved'}).select("-password")

        }
        


       

        res.status(200).json({sucess:true, message:"Doctors found" , data:doctors})

    } catch (error) {
        res.status(404).json({sucess:false, message:"not found"})
    }
}