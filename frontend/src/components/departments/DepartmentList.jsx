

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import DataTable from 'react-data-table-component'
import { columns, DepartmentButtons } from '../../utils/DepartmentHelper'
import axios from 'axios'
import toast from 'react-hot-toast'

const DepartmentList = () => {
  const [departments, setDepartments] = useState([])
  const [filteredDepartments, setFilteredDepartments] = useState([])
  const [search, setSearch] = useState('')
  const [depLoading, setDepLoading] = useState(false)

  useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true)
      try {
        const response = await axios.get('http://localhost:3000/api/department', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })

        if (response.data.success) {
          let sno = 1
          const data = response.data.departments.map((dep) => ({
            _id: dep._id,
            sno: sno++,
            dep_name: dep.dep_name,
            action: <DepartmentButtons key={dep._id} id={dep._id} />,
          }))
          setDepartments(data)
          setFilteredDepartments(data)
          toast.success("Departments loaded successfully")
        }
      } catch (error) {
        console.error(error)
        if (error.response && error.response.data && !error.response.data.success) {
          toast.error(error.response.data.error)
        } else {
          toast.error("Failed to fetch departments")
        }
      } finally {
        setDepLoading(false)
      }
    }

    fetchDepartments()
  }, [])

  useEffect(() => {
    const result = departments.filter(dep =>
      dep.dep_name.toLowerCase().includes(search.toLowerCase())
    )
    setFilteredDepartments(result)
  }, [search, departments])

  return (
    <>
      {depLoading ? (
        <div className="flex justify-center items-center mt-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-yellow-500 border-solid"></div>
        </div>
      ) : (
        <div className="p-6 bg-gray-900 min-h-screen text-yellow-400">
          {/* Page Title */}
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold">Manage Department</h3>
          </div>

          {/* Search Bar and Add Button */}
          <div className="max-w-md mx-auto flex flex-col sm:flex-row sm:items-center gap-4 relative">
            <div className="relative flex-1 w-full">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500" />
              <input
                type="text"
                placeholder="Search by Department Name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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

          {/* Department DataTable */}
          <div className="mt-6 overflow-x-auto">
          <DataTable
  columns={columns}
  data={filteredDepartments || []}
  pagination
  highlightOnHover
  customStyles={{
    headRow: {
      style: {
        backgroundColor: '#1F2937',
        color: '#FACC15',
        fontWeight: 'bold',
        fontSize: '14px',
      },
    },
    rows: {
      style: {
        backgroundColor: '#111827',
        color: '#FACC15',
        borderBottom: '1px solid #374151',
      },
    },
    pagination: {
      style: {
        backgroundColor: '#1F2937',
        color: '#FACC15',
        borderTop: '1px solid #374151',
        padding: '16px',
        justifyContent: 'center',
      },
      pageButtonsStyle: {
        borderRadius: '9999px', // fully rounded
        height: '36px',
        minWidth: '36px',
        margin: '0 6px',
        padding: '0 12px',
        backgroundColor: '#FACC15', // filled yellow
        color: '#111827', // dark text
        border: 'none',
        fontWeight: 'bold',
        fontSize: '14px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          backgroundColor: '#FDE68A', // lighter yellow on hover
          color: '#111827',
        },
        '&:disabled': {
          backgroundColor: '#9CA3AF', // gray
          color: '#1F2937',
          cursor: 'not-allowed',
          opacity: 0.5,
        },
      },
    }
    
    
  }}
/>
          </div>
        </div>
      )}
    </>
  )
}

export default DepartmentList
