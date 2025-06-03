import React from 'react'
import { Link } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'

const DepartmentList = () => {
  return (
    <div className="p-6 bg-gray-900 min-h-screen text-yellow-400">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold">Manage Department</h3>
      </div>

      <div className="max-w-md mx-auto flex flex-col sm:flex-row sm:items-center gap-4 relative">
        {/* Search input container */}
        <div className="relative flex-1 w-full">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500" />
          <input
            type="text"
            placeholder="Search by Department Name"
            className="w-full pl-10 pr-4 py-2 rounded bg-gray-800 text-yellow-400 placeholder-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 truncate"
          />
        </div>

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
