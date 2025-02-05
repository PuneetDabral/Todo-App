import connectDB from '../../../lib/db';
import Task from '../../../models/Task';
import { verifyToken } from '../../../middleware/auth';

const handler = async (req, res) => {
  await connectDB();

  if (req.method === 'GET') {
    try {
      // Count total tasks
      const totalTasks = await Task.countDocuments({ userId: req.user.id });

      // Count completed tasks
      const completedTasks = await Task.countDocuments({
        userId: req.user.id,
        status: 'Completed'
      });

      // Count pending tasks
      const pendingTasks = await Task.countDocuments({
        userId: req.user.id,
        status: 'Pending'
      });

      // Count in-progress tasks
      const inProgressTasks = await Task.countDocuments({
        userId: req.user.id,
        status: 'InProgress'
      });

      const lowPriorityTasks = await Task.countDocuments({
        userId: req.user.id,
        priority: 'Low'
      });
      const mediumPriorityTasks = await Task.countDocuments({
        userId: req.user.id,
        priority: 'Medium'
      });
      const highPriorityTasks = await Task.countDocuments({
        userId: req.user.id,
        priority: 'High'
      });

      // Send the task statistics in the required format
      return res.status(200).json({
        total: totalTasks,
        completed: completedTasks,
        pending: pendingTasks,
        inProgress: inProgressTasks,
        lowPriorityTasks,
        mediumPriorityTasks,
        highPriorityTasks
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  return res.status(405).end(); // Method Not Allowed
};

// Apply the middleware
export default verifyToken(handler);
