'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

import { deleteTask as deleteTaskAction } from '../../../../store/slices/taskSlice';
import { formatDate } from '../../../../helper';

const TaskDetails = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const [taskId, setTaskId] = useState(null);
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'low',
    status: 'pending'
  });

  useEffect(() => {
    const fetchParams = async () => {
      const unwrappedParams = await params;
      setTaskId(unwrappedParams.taskDetailsId);
    };
    fetchParams();
  }, [params]);

  const fetchTask = async (taskId) => {
    try {
      const response = await axios.get(`/api/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const taskData = response.data;
      taskData.dueDate = formatDate(taskData.dueDate);
      setTask(taskData);
    } catch (error) {
      console.error('Error fetching task:', error);
    }
  };

  useEffect(() => {
    if (taskId) {
      fetchTask(taskId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskId]);

  const deleteTask = async () => {
    try {
      await axios.delete(`/api/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data) {
        dispatch(deleteTaskAction(taskId));
        router.push('/home');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleBack = () => router.back();

  return (
    <div className='container my-5'>
      <h1 className='text-center mb-4 text-primary fw-bold fs-2'>Task Details</h1>
      <div className='card shadow-lg p-4 rounded-3'>
        <div className='card-body'>
          <h3 className='card-title fw-bold fs-3'>{task.title}</h3>
          <hr />
          <p className='card-text fs-5'>
            <strong>Description:</strong> {task.description}
          </p>
          <p className='card-text fs-5'>
            <strong>Due Date:</strong> <span className='badge bg-secondary'>{task.dueDate}</span>
          </p>

          <p className='card-text fs-5'>
            <strong>Priority:</strong>{' '}
            <span
              className={`badge ${
                task.priority === 'high' ? 'bg-danger' : task.priority === 'medium' ? 'bg-warning' : 'bg-success'
              }`}
            >
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
          </p>

          <p className='card-text fs-5'>
            <strong>Status:</strong>{' '}
            <span
              className={`badge ${
                task.status === 'pending' ? 'bg-warning' : task.status === 'inProgress' ? 'bg-info' : 'bg-success'
              }`}
            >
              {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
            </span>
          </p>

          <div className='d-flex gap-3 mt-4'>
            <Link href={`/task/${taskId}`} className='btn btn-primary btn-sm shadow-sm px-3 py-2 fs-6'>
              Edit
            </Link>
            <button onClick={deleteTask} className='btn btn-danger btn-sm shadow-sm px-3 py-2 fs-6'>
              Delete
            </button>
            <button onClick={handleBack} className='btn btn-outline-secondary btn-sm shadow-sm px-3 py-2 fs-6'>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
