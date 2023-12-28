const nodemailer = require("nodemailer");

const bookingVerificationMail = async (name, email, bookingId) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'sanford.koch93@ethereal.email',
                pass: 'JftARWPgfssHTHswsz'
            }
        });

        const verfiyUrl = `http://localhost:3000/booking/verify-booking/${bookingId}`

        const message = {
            from: 'info.transport@gmail.com',
            to: email,
            subject: "Booking verification",
            text: `Hi ${name}`,
            html: `<a href=${verfiyUrl} target="_blank">Click here to verify the booking.</a>`,
        }

        const info = await transporter.sendMail(message);
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = bookingVerificationMail

