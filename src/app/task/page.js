'use client';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import TaskForm from '../components/taskForm';

import { taskApiUrl } from '../../api';
import { updateTask } from '../../store/slices/taskSlice';

const AddTask = () => {
  const dispatch = useDispatch();
  const userSession = useSelector((state) => state.auth);
  const router = useRouter();

  const handleAddTask = async (payload) => {
    try {
      const response = await axios.post(taskApiUrl, payload, {
        headers: { Authorization: `Bearer ${userSession?.token}` }
      });
      useDispatch
      if (response.data) {
        dispatch(updateTask(response.data))
        router.push('/home');
      }
    } catch (err) {
      console.error('Error adding task');
    }
  };

  return (
    <div className='container'>
      <h1 className='text-center mb-5'>Add Task</h1>
      <TaskForm onSubmit={handleAddTask} />
    </div>
  );
};

export default AddTask;
