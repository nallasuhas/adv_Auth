import { User } from "../models/user.js";
import bcrypt from 'bcryptjs'
import { generateTokenAndSetCookie } from "../utils/generateTokenandCookie.js";


 export const login = async (req, res) => {
   
    const {email, password} = req.body;
    try{
       // check if the user exits in Users collection
     const user = await User.findOne({email})
     if(!user){
       return  res.status(400).json({success: false, message: "Invalid credentials"})
     }
     // check if the password is valid
     const isPasswordValid = bcrypt.compare(password, user.password)
     if(!isPasswordValid){
       return  res.status(400).json({success: false, message: "Invalid credentials"})
     }
     //generate the token and set it as cookie
     generateTokenAndSetCookie(res, user._id);
     user.lastLogin = new Date();
     //save the user to database
     await user.save();
     res.status.json({
      success: true,
      message: "login successful"
     })
    }
    catch(e){
      console.log("login error:" + e);
      res.status.json({success: false, message: e.message})
    }
}
