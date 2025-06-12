import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddDepartment = () => {
  // State to hold department form data
  const [department, setDepartment] = useState({
    dep_name: '',
    description: ''
  });

  const navigate = useNavigate();

  // Update state when input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3000/api/department/add',
        department,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Send token for authentication
            'Content-Type': 'application/json'
          }
        }
      );

      // If successful, show toast and navigate to department list
      if (response?.data?.success) {
        toast.success("Department added successfully");
        navigate('/admin-dashboard/departments');
      } else {
        toast.error('Failed to add department.');
      }
    } catch (error) {
      // Handle known and unknown errors
      if (error.response) {
        if (error.response.status === 409) {
          toast.error("Department already exists.");
        } else if (error.response.data && !error.response.data.success) {
          toast.error(error.response.data.error);
        } else {
          toast.error('Something went wrong. Please try again.');
        }
      } else {
        toast.error('Network error. Please check your connection.');
      }
    }
  };

  return (
    // Full screen center-aligned form container
    <div className="h-screen bg-gray-900 text-yellow-400 flex items-center justify-center">
      {/* Form Card */}
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6 overflow-y-auto max-h-screen sm:overflow-visible sm:max-h-fit">
        <h3 className="text-2xl font-bold mb-6 text-center">Add Department</h3>

        {/* Department Form */}
        <form onSubmit={handleSubmit}>

          {/* Department Name Field */}
          <div className="mb-4">
            <label htmlFor="dep_name" className="block mb-1 font-semibold">
              Department Name
            </label>
            <input
              type="text"
              id="dep_name"
              name="dep_name"
              value={department.dep_name}
              onChange={handleChange}
              placeholder="Enter Department name"
              className="w-full p-2 rounded bg-gray-700 text-yellow-400 focus:outline-yellow-400"
              required
            />
          </div>

          {/* Description Field */}
          <div className="mb-6">
            <label htmlFor="description" className="block mb-1 font-semibold">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={department.description}
              placeholder="Description"
              onChange={handleChange}
              rows="4"
              className="w-full p-2 rounded bg-gray-700 text-yellow-400 focus:outline-yellow-400 resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-2 rounded transition"
          >
            Add Department
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDepartment;
