'use client';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

// import {
//   FaTasks,
//   FaCheckCircle,
//   FaClock,
//   FaExclamationCircle,
//   FaArrowDown,
//   FaArrowRight,
//   FaArrowUp
// } from 'react-icons/fa';

import { taskApiUrl } from '../../api';

const Dashboard = () => {
  const token = useSelector((state) => state.auth.token);
  const [taskStats, setTaskStats] = useState({});

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${taskApiUrl}/stats`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data) {
        setTaskStats(response.data);
      }
    } catch (error) {
      console.error('Error fetching task stats:', error);
    }
  };

  useEffect(() => {
    fetchStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='container my-5'>
      <h1 className='text-center mb-4 text-primary fw-bold'>Dashboard</h1>
      <div className='row'>
        {/* Total Tasks Card */}
        <div className='col-lg-3 col-md-6 mb-4'>
          <div className='card shadow-lg hover-card'>
            <div className='card-body bg-primary text-white text-center'>
              {/* <FaTasks className='fs-3 mb-3' /> */}
              <h5 className='card-title'>Total Tasks</h5>
              <p className='card-text fs-4'>{taskStats?.total}</p>
            </div>
          </div>
        </div>

        {/* Completed Tasks Card */}
        <div className='col-lg-3 col-md-6 mb-4'>
          <div className='card shadow-lg hover-card'>
            <div className='card-body bg-success text-white text-center'>
              {/* <FaCheckCircle className='fs-3 mb-3' /> */}
              <h5 className='card-title'>Completed</h5>
              <p className='card-text fs-4'>{taskStats?.completed}</p>
            </div>
          </div>
        </div>

        {/* Pending Tasks Card */}
        <div className='col-lg-3 col-md-6 mb-4'>
          <div className='card shadow-lg hover-card'>
            <div className='card-body bg-warning text-white text-center'>
              {/* <FaClock className='fs-3 mb-3' /> */}
              <h5 className='card-title'>Pending</h5>
              <p className='card-text fs-4'>{taskStats?.pending}</p>
            </div>
          </div>
        </div>

        {/* In Progress Tasks Card */}
        <div className='col-lg-3 col-md-6 mb-4'>
          <div className='card shadow-lg hover-card'>
            <div className='card-body bg-info text-white text-center'>
              {/* <FaExclamationCircle className='fs-3 mb-3' /> */}
              <h5 className='card-title'>In Progress</h5>
              <p className='card-text fs-4'>{taskStats?.inProgress}</p>
            </div>
          </div>
        </div>

        {/* Priority Tasks Cards */}
        <div className='col-lg-3 col-md-6 mb-4'>
          <div className='card shadow-lg hover-card'>
            <div className='card-body bg-danger text-white text-center'>
              {/* <FaArrowDown className='fs-3 mb-3' /> */}
              <h5 className='card-title'>Low Priority</h5>
              <p className='card-text fs-4'>{taskStats?.lowPriorityTasks}</p>
            </div>
          </div>
        </div>

        <div className='col-lg-3 col-md-6 mb-4'>
          <div className='card shadow-lg hover-card'>
            <div className='card-body bg-warning text-white text-center'>
              {/* <FaArrowRight className='fs-3 mb-3' /> */}
              <h5 className='card-title'>Medium Priority</h5>
              <p className='card-text fs-4'>{taskStats?.mediumPriorityTasks}</p>
            </div>
          </div>
        </div>

        <div className='col-lg-3 col-md-6 mb-4'>
          <div className='card shadow-lg hover-card'>
            <div className='card-body bg-success text-white text-center'>
              {/* <FaArrowUp className='fs-3 mb-3' /> */}
              <h5 className='card-title'>High Priority</h5>
              <p className='card-text fs-4'>{taskStats?.highPriorityTasks}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
