import { User } from "../models/user.js"


export const checkAuth = async (req, res) => {
    try{
        //select the user excluding password field
     const user = await User.findById(req.userId).select("-password")
     if(!user){
        return res.status(400).json({ success: false, message: "User not found" });
     }
     res.status(200).json({ success: true, user });
    }catch(error){
        console.log("Error in checkAuth ", error);
		res.status(400).json({ success: false, message: error.message });
    }
}