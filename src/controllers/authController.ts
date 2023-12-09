import { Request, Response } from 'express';
import { IUser, User } from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default class AuthController {
	login = async (req: Request, res: Response): Promise<void> => {
		try {
			const { email, password } = req.body;
			const user: IUser | null = await User.findOne({ email });

			if (!user) {
				res.status(404).json({ message: 'User not found' });
				return;
			}

			// Compare the provided password with the hashed password in the database
			const passwordMatch = await bcrypt.compare(password, user.password);

			if (!passwordMatch) {
				res.status(401).json({ message: 'Invalid password' });
				return;
			}

			// Create a JWT token
			const token = jwt.sign({ userId: user._id }, 'your_secret_key', {
				expiresIn: '1h',
			});

			res.status(200).json({ message: 'Login successful', token });
		} catch (error) {
			res.status(500).json({ error });
		}
	};

	signUp = async (req: Request, res: Response): Promise<void> => {
		try {
			const { firstName, lastName, email, password } = req.body;

			// Check if the email is already registered
			const existingUser: IUser | null = await User.findOne({ email });

			if (existingUser) {
				res.status(409).json({ message: 'Email already exists' });
				return;
			}

			// Hash the password before saving
			const hashedPassword = await bcrypt.hash(password, 10);

			const newUser: IUser = new User({
				firstName,
				lastName,
				email,
				password: hashedPassword,
			});

			const savedUser: IUser = await newUser.save();
			res.status(201).json(savedUser);
		} catch (error) {
			res.status(500).json({ error });
		}
	};
}
