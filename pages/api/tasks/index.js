import Task from '../../../models/Task';
import { verifyToken } from '../../../middleware/auth';
import connectDB from '../../../lib/db';

const handler = async (req, res) => {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const tasks = await Task.find({ userId: req.user.id });
      return res.status(200).json(tasks);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  if (req.method === 'POST') {
    const { title, description, dueDate, priority, status } = req.body;
    try {
      const newTask = new Task({
        title,
        description,
        dueDate,
        priority,
        status,
        userId: req.user.id
      });
      await newTask.save();
      return res.status(201).json(newTask);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  return res.status(405).end(); // Method Not Allowed
};

// Apply the middleware
export default verifyToken(handler);
