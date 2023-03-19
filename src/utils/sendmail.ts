import nodemailer from 'nodemailer';

/**
 * Sends a verification email to the user with the provided email address
 * containing the generated OTP.
 * @param {Object} user - The user to send the verification email to.
 * @param {number} generatedOTP - The one-time password to include in the email.
 */
export async function sendVerificationEmail(user: any, generatedOTP: number) {
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: user.email,
        subject: 'Email Verification OTP',
        html: `<h1> Your OTP is ${generatedOTP} </h1>
          <a href="${process.env.VERIFY_URL}/${user.email}">CLICK ON THIS LINK TO GO TO VERIFICATION PAGE</a>
    `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Verification email sent successfully to ${user.email}.`);
    } catch (error) {
        console.error(`Error sending verification email to ${user.email}:`, error);
        throw error;
    }
}
