import React from 'react'
import { Link } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'

const DepartmentList = () => {
  return (
    // Main container with padding, dark background, and yellow text
    <div className="p-6 bg-gray-900 min-h-screen text-yellow-400">
      
      {/* Page Title */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold">Manage Department</h3>
      </div>

      {/* Search bar and Add Department button */}
      <div className="max-w-md mx-auto flex flex-col sm:flex-row sm:items-center gap-4 relative">
        
        {/* Search input container */}
        <div className="relative flex-1 w-full">
          {/* Search icon placed inside the input field */}
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500" />

          {/* Search input */}
          <input
            type="text"
            placeholder="Search by Department Name"
            className="w-full pl-10 pr-4 py-2 rounded bg-gray-800 text-yellow-400 placeholder-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 truncate"
          />
        </div>

        {/* Link to Add Department Page */}
        <Link
          to="/admin-dashboard/add-department"
          className="px-5 py-2 bg-yellow-500 text-gray-900 font-semibold rounded hover:bg-yellow-600 transition text-center whitespace-nowrap"
        >
          Add New Department
        </Link>
      </div>
    </div>
  )
}

export default DepartmentList
