import connectDB from '../../../lib/db';
import User from 'models/User.js';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  await connectDB();

  if (req.method !== 'POST') return res.status(405).end();

  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
