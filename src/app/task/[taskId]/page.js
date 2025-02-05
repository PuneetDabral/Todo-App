// src/pages/edit-task/[id].js
'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

import TaskForm from '../../components/taskForm';

import { taskApiUrl } from '../../../api';
import { updateTask } from '../../../store/slices/taskSlice';

import axiosInstance from '../../../axiosInstance';

const EditTask = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);

  const [taskId, setTaskId] = useState(null);

  useEffect(() => {
    const fetchParams = async () => {
      const unwrappedParams = await params;
      setTaskId(unwrappedParams.taskId);
    };
    fetchParams();
  }, [params]);

  const handleUpdateTask = async (taskData) => {
    try {
      const response = await axiosInstance.put(`${taskApiUrl}/${taskId}`, taskData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data) {
        dispatch(updateTask(response.data));
        router.push('/home');
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className='container'>
      <h1 className='text-center mb-5'>Edit Task</h1>
      <TaskForm taskId={taskId} onSubmit={handleUpdateTask} />
    </div>
  );
};

export default EditTask;
