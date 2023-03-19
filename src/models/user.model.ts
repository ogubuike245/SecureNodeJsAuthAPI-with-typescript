// Importing the Mongoose package
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isVerified: Boolean;
    created_at: Date;
    updated_at: Date;
}

export interface IUserModel extends IUser {}

const UserSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        isVerified: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
        // versionKey: false
    }
);

export default mongoose.model<IUserModel>('User', UserSchema);
