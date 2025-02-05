import User from '../../../models/User';
import jwt from 'jsonwebtoken';
import connectDB from '../../../lib/db';

export default async function handler(req, res) {
  await connectDB();

  if (req.method !== 'POST') return res.status(405).end();

  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({ token,email:username });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
