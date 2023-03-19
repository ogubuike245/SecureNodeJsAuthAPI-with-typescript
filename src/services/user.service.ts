import bcrypt from 'bcrypt';
import Token from '../models/token.model';
import User from '../models/user.model';
import { generateOneTimePassword } from '../utils/helpers';
import { sendVerificationEmail } from '../utils/sendmail';

export const registerUser = async function (userData: any) {
    try {
        const { email, password, firstName, lastName } = userData;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return {
                error: true,
                message:
                    'A user with that email address already exists. Please try again with a different email address or log in to your existing account.',
                status: 400
            };
        }

        // Generate and hash the OTP
        const generatedOTP = generateOneTimePassword();
        const saltRounds = 10;
        const hashedOtp = await bcrypt.hash(generatedOTP, saltRounds);

        // Hash password and save the user data along with the encrypted OTP in the database
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            isVerified: false
        });

        const token = new Token({
            value: hashedOtp,
            generatedOTP,
            user: newUser._id
        });

        await newUser.save();
        await token.save();

        await sendVerificationEmail(newUser, Number(generatedOTP));

        return {
            success: true,
            message:
                'Registration successful! A verification email has been sent to your email address. Please follow the instructions in the email to complete the verification process and log in to your account.',
            status: 201
        };
    } catch (error: any) {
        console.log(error);
        return {
            error: true,
            message: error.message,
            status: 500
        };
    }
};

export default { registerUser };
