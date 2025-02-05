import connectDB from '../../../lib/db';
import Task from '../../../models/Task';
import { verifyToken } from '../../../middleware/auth'; 

const handler= async(req, res)=> {
  await connectDB();

  const { id } = req.query;
  const userId = req.user.id;  
  const { method } = req;

  try {
    const task = await Task.findOne({ _id: id, userId }); 
    if (!task) return res.status(404).json({ message: 'Task not found' });

    switch (method) {
      case 'GET':
        return res.status(200).json(task);

      case 'PUT':
        const updatedTask = await Task.findOneAndUpdate(
          { _id: id, userId },   
          req.body,
          { new: true, runValidators: true }
        );
        return res.status(200).json(updatedTask);

      case 'DELETE':
        await Task.findOneAndDelete({ _id: id, userId }); 
        console.log(task)
        return res.status(200).json(task);

      default:
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}



export default verifyToken(handler);
