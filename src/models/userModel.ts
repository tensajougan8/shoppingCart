import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

const UserSchema: Schema = new mongoose.Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String },
	},
	{
		timestamps: true, // Add createdAt and updatedAt fields
	}
);

export const User = mongoose.model<IUser>('User', UserSchema);
