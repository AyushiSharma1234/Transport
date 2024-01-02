const nodemailer = require("nodemailer");

const bookingVerificationMail = async (name, email, bookingId) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'amara.lowe41@ethereal.email',
                pass: 'VfaXxj2JYbvS2aKg75'
            }
        });

        const verfiyUrl = `http://localhost:4000/booking/verify-booking/${bookingId}`

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

