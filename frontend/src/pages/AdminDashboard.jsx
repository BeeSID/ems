import React from 'react'
import { useAuth } from '../context/authContext' // Get user info from context
import AdminSidebar from '../components/dashboard/AdminSidebar' // Sidebar component
import Navbar from '../components/dashboard/Navbar' // Top navigation bar
import { Outlet } from 'react-router-dom' // Used for rendering nested routes

const AdminDashboard = () => {
  const { user } = useAuth() // Get the currently logged-in user (optional usage here)

  return (
    <div className="flex h-screen bg-gray-900 text-yellow-400">
      {/* Sidebar: fixed to the left with fixed width and full height */}
      <div className="fixed top-0 left-0 h-full w-64 bg-gray-900 shadow-lg">
        <AdminSidebar />
      </div>

      {/* Main content area: takes the remaining width and pushes right of sidebar */}
      <div className="flex-1 ml-64 flex flex-col overflow-auto">
        {/* Top Navbar: sits above the content area */}
        <div className="bg-gray-800 shadow-md">
          <Navbar />
        </div>

        {/* Routed pages go here depending on the current route (like Summary, Departments, etc.) */}
        <div className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
