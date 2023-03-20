import bcrypt from 'bcrypt';
import Token from '../models/token.model';
import User from '../models/user.model';
import { generateOneTimePassword } from '../utils/helpers';
import { sendVerificationEmail } from '../utils/sendmail';

export const registerUserService = async function (userData: any) {
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

export const verifyEmailService = async function (id: any, otp: any) {
    try {
        if (!otp) {
            return {
                error: true,
                message: 'Please input OTP.',
                status: 400
            };
        }

        const existingUser = await User.findById(id);

        if (!existingUser) {
            return {
                error: true,
                message: 'User does not exist.',
                status: 400
            };
        }

        const existingToken = await Token.findOne({
            user: existingUser?._id,
            generatedOTP: otp
        });
        console.log(existingToken);

        if (!existingToken) {
            return {
                error: true,
                message: 'Token not found or has expired.',
                status: 400
            };
        }

        const isValidOTP = await bcrypt.compare(otp, existingToken.value);

        if (!isValidOTP) {
            return {
                error: true,
                message: 'Invalid OTP.',
                status: 400
            };
        }

        await User.updateOne({ _id: existingUser._id }, { $set: { isVerified: true } });

        await Token.deleteOne({ user: existingUser._id, generatedOTP: otp });

        return {
            success: true,
            message: 'Email verification successful! You can now log in to your account.',
            redirect: '/',
            status: 200
        };
    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: 'Internal server error.',
            status: 500
        };
    }
};

export default { registerUserService, verifyEmailService };
