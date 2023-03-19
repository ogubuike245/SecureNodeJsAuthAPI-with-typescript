// Importing the Mongoose package
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export interface IToken {
    value: string;
    generatedOTP: number;
    user: string;
    expires: Date;
}

export interface ITokenModel extends IToken {}

const TokenSchema = new Schema({
    value: {
        type: String,
        required: true
    },
    generatedOTP: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    expires: { type: Date, default: Date.now, expires: 3600 }
});

export default mongoose.model<ITokenModel>('Token', TokenSchema);
