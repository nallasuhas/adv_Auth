import { User } from "../models/user.js";


export const verifyEmail = async (req, res) => {
    const {code} = req.body;
    try{
        const user = await User.findOne({verificationToken: code, verificationTokenExpiry: {$gt: Date.now()}})
        if(!user){
            return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
        }
        user.isVerified =true;
        user.verificationToken = undefined;
        user.verificationTokenExpiry = undefined;
        await user.save();

        res.status(200).json({success: true, 
            messasge: "Email verified successfully",
            user: {
				...user._doc,
				password: undefined,
			},})
    }catch (error) {
		console.log("error in verifyEmail ", error);
		res.status(500).json({ success: false, message: "Server error" });
	}
}