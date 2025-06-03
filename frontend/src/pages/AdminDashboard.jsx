import React from 'react'
import { useAuth } from '../context/authContext'
import AdminSidebar from '../components/dashboard/AdminSidebar'
import Navbar from '../components/dashboard/Navbar'
import AdminSummary from '../components/dashboard/AdminSummary'
import { Outlet } from 'react-router-dom'

const AdminDashboard = () => {
  const { user } = useAuth()

  return (
    <div className="flex h-screen bg-gray-900 text-yellow-400">
      {/* Sidebar: fixed width 64 */}
      <div className="fixed top-0 left-0 h-full w-64 bg-gray-900 shadow-lg">
        <AdminSidebar />
      </div>

      {/* Main content: takes remaining width with margin left */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Navbar: yellow background */}
        <div className="bg-grey-500">
          <Navbar />
          <Outlet />
          {/* <AdminSummary /> */}
        </div>

        
      </div>
    </div>
  )
}

export default AdminDashboard
