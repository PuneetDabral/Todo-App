'use client';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { formatDate } from '../../helper';
import { priorityOptions, statusOptions } from '../../constant';

const SelectInput = ({ label, name, value, onChange, options, required }) => {
  return (
    <div className='mb-3'>
      <label className='form-label'>{label}</label>
      <select className='form-select' name={name} value={value} onChange={onChange} required={required}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const TaskForm = ({ taskId, onSubmit, initialData }) => {
  const router = useRouter();
  const token = useSelector((state) => state.auth.token);

  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'low',
    status: 'pending'
  });

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
    } else if (initialData) {
      initialData.dueDate = formatDate(initialData.dueDate);
      setTask(initialData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskId, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(task); 
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleBack = () => router.back();

  return (
    <div className='container my-5'>
      <div className='card shadow-lg p-4'>
        <h3 className='card-title mb-4'>{taskId ? 'Edit Task' : 'Add Task'}</h3>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label className='form-label'>Title</label>
            <input
              type='text'
              className='form-control'
              name='title'
              value={task.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className='mb-3'>
            <label className='form-label'>Description</label>
            <textarea
              className='form-control'
              name='description'
              value={task.description}
              onChange={handleChange}
              rows='4'
            />
          </div>

          <div className='mb-3'>
            <label className='form-label'>Due Date</label>
            <input
              type='date'
              className='form-control'
              name='dueDate'
              value={task.dueDate}
              onChange={handleChange}
              required
            />
          </div>

          <SelectInput
            label='Priority'
            name='priority'
            value={task.priority}
            onChange={handleChange}
            options={priorityOptions}
            required
          />
          <SelectInput
            label='Status'
            name='status'
            value={task.status}
            onChange={handleChange}
            options={statusOptions}
            required
          />

          <div className='d-flex justify-content-between'>
            <button type='button' className='btn btn-outline-secondary' onClick={handleBack}>
              Back
            </button>
            <button type='submit' className='btn btn-primary ms-3'>
              {taskId ? 'Update Task' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
