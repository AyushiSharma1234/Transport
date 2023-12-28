const nodemailer = require("nodemailer");
const otpGenerator = require('otp-generator');
const User = require("../model/user");

const forgetPasswordVerificationMail = async (user) => {
    const OTP = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
    try {
        await User.findOneAndUpdate({_id:user._id}, { OTP })
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'doug53@ethereal.email',
                pass: 'eUMavhY9aVVBUCYfVm'
            }
        });

        const message = {
            from: 'info.transport@gmail.com',
            to: user.email,
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

