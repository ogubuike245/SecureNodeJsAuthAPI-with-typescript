import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Token from '../models/token.model';
import { sendVerificationEmail } from './sendmail';
import { Response } from 'express';

// Extracting the API_PORT and MONGO_DB_URI environment variables
const { JWT_SECRET } = process.env;

// RESUSABLE FUNCTIONS

export const createToken = (id: string, secret: string) => {
    return jwt.sign({ id }, secret, {
        expiresIn: process.env.MAX_AGE
    });
};

// GENERATE OTP OF FOUR DIGITS
export const generateOneTimePassword = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};

// GENERATE OTP AND SAVE TO TOKEN MODEL
export const generateOneTimePasswordAndSave = async (userId: string) => {
    const generatedOTP = generateOneTimePassword();
    await Token.deleteOne({ user: userId });
    const hashedOtp = await bcrypt.hash(generatedOTP, 10);
    const token = new Token({ value: hashedOtp, user: userId, generatedOTP });
    await token.save();
    return { hashedOTP: hashedOtp, generatedOTP: generatedOTP };
};

// GET NEW OTP FUNCTION
export const getNewOTP = async (res: Response, user: any) => {
    // generate new verification token and send it
    const newToken = await generateOneTimePasswordAndSave(user._id);
    await sendVerificationEmail(user, Number(newToken.generatedOTP));
    return res.status(401).json({
        success: true,
        message:
            'Your verification code has expired. Verification codes are valid for 24 hours, A New verification code has been sent to your email.'
    });
};
