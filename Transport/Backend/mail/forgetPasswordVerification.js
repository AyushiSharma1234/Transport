const nodemailer = require("nodemailer");
const otpGenerator = require('otp-generator');
const User = require("../model/user");

const forgetPasswordVerificationMail = async (email) => {
    const OTP = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
    try {
       const user= await User.findOneAndUpdate({email:email}, { OTP })
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'amara.lowe41@ethereal.email',
                pass: 'VfaXxj2JYbvS2aKg75'
            }
        });

        const message = {
            from: 'info.transport@gmail.com',
            to: email,
            subject: "Forget Password OTP",
            text: `Hi ${user.name}`,
            html: `<p>OTP : ${OTP} </p>`,
        }

        const info = await transporter.sendMail(message);
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = forgetPasswordVerificationMail

