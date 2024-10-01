import bcrypt from "bcryptjs"
import {User} from "../models/user.js"
import { generateTokenAndSetCookie } from "../utils/generateTokenandCookie.js"
import { sendVerificationEmail } from "../mailtrap/emails.js"

//controller logic for signup
export const signup = async (req, res) => {
    //extract info from request
    const {email, password, name} = req.body
    console.log(email,password);
    
    try{
        if(!email || !password || !name ){
            throw new Error("All fields are required")
        }
        //check if the user already exists
        const userAlreadyExists = await User.findOne( { email } )
        console.log( userAlreadyExists +" user already exists");
        if(userAlreadyExists){
            return res.status(400).json({message: "Error! user already exists"})
        }
        //If no user exits with the given info
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random()*900000).toString();
        //create a new document using 'User' model containing hashed password and verification token
        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiry: Date.now() + 24*60*60*1000
        })
        //save the user to database
        await user.save();
        console.log("user saved");
        
        

        generateTokenAndSetCookie(res, user._id)
        await sendVerificationEmail(email, verificationToken)

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
