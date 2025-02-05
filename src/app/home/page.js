'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import TaskCard from '../components/taskCard';

import { fetchTasks, deleteTask } from '../../store/slices/taskSlice';
import { taskApiUrl } from '../../api';

const Home = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const tasks = useSelector((state) => state.tasks);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // Delete task
  const handleRemoveTask = async (taskId) => {
    try {
      const response = await axios.delete(`${taskApiUrl}/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data) {
        dispatch(deleteTask(response.data));
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className='container my-5'>
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <h1 className='fw-bold text-primary'>Task List</h1>
        <button className='btn btn-primary btn-lg shadow-sm px-4' onClick={() => router.push('/task')}>
          + Add Task
        </button>
      </div>

      <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4'>
        {tasks.length === 0 ? (
          <p className='text-center text-muted fs-4'>No tasks available</p>
        ) : (
          tasks.map((task, index) => <TaskCard key={`${task.id}-${index}`} task={task} deleteTask={handleRemoveTask} />)
        )}
      </div>
    </div>
  );
};

export default Home;
