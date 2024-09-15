import bcrypt from "bcryptjs"
import {User} from "../models/user.js"
import { generateTokenAndSetCookie } from "../utils/generateTokenandCookie.js"

export const signup = async (req, res) => {
    const {email, password, name} = req.body
    try{
        if(!email || !password || !name ){
            throw new Error("All fields are required")
        }

        const userAlreadyExists = await User.findOne( { email } )
        console.log( userAlreadyExists +" user already exists");
        if(userAlreadyExists){
            return res.status(400).json({message: "Error! user already exists"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random()*900000).toString();
        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiry: Date.now() + 24*60*60*1000
        })

        await user.save();
        console.log("user saved");
        
        

        generateTokenAndSetCookie(res, user._id)

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
				...user._doc,
				password: undefined,
			},

        })


        
    }
    catch(e){
        res.status(400).json({message: e.message})
    }
}
