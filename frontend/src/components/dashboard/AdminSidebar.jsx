import React, { useState } from 'react'
import {
  FaTachometerAlt,
  FaUsers,
  FaBuilding,
  FaMoneyBill,
  FaCog,
  FaBars,
  FaTimes,
  FaCalendarAlt,
} from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

// Navigation link definitions
const links = [
  { to: '/admin-dashboard', icon: <FaTachometerAlt />, label: 'Dashboard' },
  { to: '/admin-dashboard/employees', icon: <FaUsers />, label: 'Employees' },
  { to: '/admin-dashboard/departments', icon: <FaBuilding />, label: 'Departments' },
  { to: '/admin-dashboard/leave', icon: <FaCalendarAlt />, label: 'Leave' },
  { to: '/admin-dashboard/salary', icon: <FaMoneyBill />, label: 'Salary' },
  { to: '/admin-dashboard/settings', icon: <FaCog />, label: 'Settings' },
]

const AdminSidebar = () => {
  // Track sidebar visibility for mobile
  const [isOpen, setIsOpen] = useState(false)

  // Toggle sidebar open/close
  const toggleSidebar = () => setIsOpen(!isOpen)

  return (
    <>
      {/* Mobile Top Navbar */}
      <div className="md:hidden flex justify-between items-center bg-gray-900 p-4 text-white">
        <h3 className="text-lg font-bold text-yellow-400">Admin Dashboard</h3>
        <button onClick={toggleSidebar} className="text-white text-2xl">
          {/* Toggle between hamburger and close icon */}
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`
          ${isOpen ? 'block' : 'hidden'} md:block
          bg-gray-900 text-white w-64 h-screen fixed md:relative z-50
        `}
      >
        {/* Sidebar header */}
        <div className="p-4 text-center border-b border-gray-700">
          <h3 className="text-xl font-bold text-yellow-400 hidden md:block">EMS Admin</h3>
        </div>

        {/* Sidebar links */}
        <nav className="flex flex-col p-4 space-y-2">
          {links.map((link, index) => (
            <NavLink
              key={index}
              to={link.to}
              // Conditional class styling based on active route
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-yellow-500 text-gray-900 font-semibold' // Active style
                    : 'hover:bg-gray-700' // Hover style
                }`
              }
              onClick={() => setIsOpen(false)} // Close sidebar on mobile after click
            >
              {link.icon}
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  )
}

export default AdminSidebar
