import React, { useState } from 'react'
import {FaTachometerAlt,  FaUsers,  FaBuilding,  FaMoneyBill,  FaCog,  FaBars,  FaTimes,  FaCalendarAlt,
} from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/admin-dashboard', icon: <FaTachometerAlt />, label: 'Dashboard' },
  { to: '/admin-dashboard/employees', icon: <FaUsers />, label: 'Employees' },
  { to: '/admin-dashboard/departments', icon: <FaBuilding />, label: 'Departments' },
  { to: '/admin-dashboard/leave', icon: <FaCalendarAlt />, label: 'Leave' }, 
  { to: '/admin-dashboard/salary', icon: <FaMoneyBill />, label: 'Salary' },
  { to: '/admin-dashboard/settings', icon: <FaCog />, label: 'Settings' },
]

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => setIsOpen(!isOpen)

  return (
    <>
      {/* Mobile Navbar */}
      <div className="md:hidden flex justify-between items-center bg-gray-900 p-4 text-white">
        <h3 className="text-lg font-bold text-yellow-400">Admin Dashboard</h3>
        <button onClick={toggleSidebar} className="text-white text-2xl">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? 'block' : 'hidden'
        } md:block bg-gray-900 text-white w-64 h-screen fixed md:relative z-50`}
      >
        <div className="p-4 text-center border-b border-gray-700">
          <h3 className="text-xl font-bold text-yellow-400 hidden md:block">EMS Admin</h3>
        </div>
        <nav className="flex flex-col p-4 space-y-2">
          {links.map((link, index) => (
            <NavLink
              key={index}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-yellow-500 text-gray-900 font-semibold'
                    : 'hover:bg-gray-700'
                }`
              }
              onClick={() => setIsOpen(false)} // close on mobile
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
