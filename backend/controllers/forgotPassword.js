import { sendPasswordResetEmail } from "../mailtrap/emails.js";
import { User } from "../models/user.js";
import crypto from "crypto"

export const forgotPassword = async (req, res) => {
    const {email} = req.body;
    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({success: false, message: "user not found" })
        }

        const resetToken = crypto.randomBytes(20).toString('hex')
        const resetTokenExpiryAt = Date.now() + 1*60*60*1000

         user.resetPasswordToken = resetToken;
         user.resetPasswordTokenExpiry = resetTokenExpiryAt;

        await user.save();

        await sendPasswordResetEmail(user.email,`http://localhost:5713/reset-password/${resetToken}` )

        

        res.status(200).json({ success: true, message: "Password reset link sent to your email", user: user });
    }
    catch(e){
        console.log("Error in forgotPassword ", error);
		res.status(400).json({ success: false, message: error.message });
    }
}