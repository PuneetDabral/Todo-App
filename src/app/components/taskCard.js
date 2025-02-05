import React from 'react';
import Link from 'next/link';

const TaskCard = ({ task, deleteTask }) => {
  return (
    <div className='col' key={task._id}>
      <div className='card h-100 shadow-sm'>
        <div className='card-body'>
          <h5 className='card-title text-primary'>{task.title}</h5>
          <p className='card-text'>{task.description}</p>
          <p className='card-text'>
            <strong>Due Date:</strong> {task.dueDate}
          </p>
          <p className='card-text'>
            <strong>Priority:</strong>{' '}
            <span
              className={`badge bg-${
                task.priority === 'High' ? 'danger' : task.priority === 'Medium' ? 'warning' : 'success'
              }`}
            >
              {task.priority}
            </span>
          </p>

          <div className='d-flex justify-content-between'>
            <Link href={`/task/details/${task._id}`} className='btn btn-info'>
              <i className='bi bi-eye'></i> View Details
            </Link>
            <Link href={`/task/${task._id}`} className='btn btn-warning'>
              <i className='bi bi-pencil-square'></i> Edit
            </Link>
            <button onClick={() => deleteTask(task._id)} className='btn btn-danger'>
              <i className='bi bi-trash'></i> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;