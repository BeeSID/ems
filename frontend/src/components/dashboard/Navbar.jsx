import React from 'react'
import { useAuth } from '../../context/authContext'

const Navbar = () => {
  const { user } = useAuth()

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between h-auto sm:h-12 bg-gray-900 px-4 py-3 sm:py-0 text-yellow-400">
      <p className="text-lg font-semibold mb-2 sm:mb-0">Welcome, {user?.name}</p>
      <button className="px-4 py-1 bg-yellow-500 text-gray-900 rounded hover:bg-yellow-600 transition w-full sm:w-auto">
        Logout
      </button>
    </div>
  )
}

export default Navbar
