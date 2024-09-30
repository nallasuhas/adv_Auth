import { sendResetSuccessEmail } from "../mailtrap/emails.js";
import { User } from "../models/user.js";
import bcrypt from "bcryptjs"


export const resetPassword = async(req, res) => {
    try{
      const {token} = req.params;
      const {password} = req.body;

      const user = await User.findOne({resetPasswordToken: token, resetPasswordTokenExpiry: {$gt: Date.now()}})

      if(!user){
        return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
      }

     const hashedPassword = (await bcrypt.hash(password, 10)).toString()

     user.password = hashedPassword;
     user.resetPasswordToken = undefined;
     user.resetPasswordTokenExpiry = undefined;
     await user.save();
     await sendResetSuccessEmail(user.email)

     res.status(200).json({ success: true, message: "Password reset successful" });

    }catch(error){
        console.log("Error in resetPassword ", error);
		res.status(400).json({ success: false, message: error.message });
    }
}