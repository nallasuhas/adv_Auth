
import {client, sender} from "./mailtrapconfig.js"
import { VERIFICATION_EMAIL_TEMPLATE,PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailTemplates.js"

// send verification email after signup
export const sendVerificationEmail = async (email, verificationToken) => {
    //send to the email submitted by the user
  const recipient = [{email}]
  try{
    const response = await client.send({
        from: sender,
        to: recipient,
        subject: "verify your email",
        html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode", verificationToken),
        category: "Email verification"
    })
    console.log("Email sent successfully", response);
    
  } catch (error) {
    console.error(`Error sending verification`, error);

    throw new Error(`Error sending verification email: ${error}`);
}
}
// export const sendWelcomeEmail = async(email, name) => {
//     const recipient = [{email}];
//         try{
//           const response = await client.send({
//             from: sender,
//             to: recipient,
//             subject: ""
//           })
//         }
    
// }





//send password reset email for forgot password page
export const sendPasswordResetEmail = async(email, resetURL) => {
   const recipient = [{email}]
   try{
    const response = await client.send({
        from: sender,
        to: recipient,
        subject: "Reset your password",
        html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
        category: "password reset"
    })
   }
   catch(error){
       console.error(`Error sending password reset email`, error);

		throw new Error(`Error sending password reset email: ${error}`);
    
   }
}

export const sendResetSuccessEmail = async(email) => {
 const recipient = [{email}]
 try{
    const response = await client.send({
        from: sender,
        to: recipient,
        subject: "password reset successful",
        html: PASSWORD_RESET_SUCCESS_TEMPLATE,
        category: "password reset"
    })
    console.log("Password reset email sent successfully", response);
 }
 catch (error) {
    console.error(`Error sending password reset success email`, error);

    throw new Error(`Error sending password reset success email: ${error}`);
}
}