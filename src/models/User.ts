import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
    content: string;
    createdAt: Date;
}

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verificationCode: string;
    verificationCodeExpiry: Date;
    verified: boolean;
    isAcceptingMessages: boolean;
    messages: Message[];
}

const MessageSchema: Schema<Message> = new Schema({
    content: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date,
        required: true, 
        default: Date.now 
    },
});


const UserSchema: Schema<User> = new Schema({
    username: { 
        type: String, 
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
    },
    email: { 
        type: String, 
        required: [true, 'Email is required'],
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email'], 
    },
    password: { 
        type: String, 
        required: [true, 'Password is required'], 
    },
    verificationCode: { 
        type: String, 
        required: true 
    },
    verificationCodeExpiry: { 
        type: Date, 
        required: true 
    },
    verified: { 
        type: Boolean, 
        default: false
    },
    isAcceptingMessages: { 
        type: Boolean,
        default: true
    },
    messages: [MessageSchema]
});

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>('User', UserSchema);

export default UserModel;