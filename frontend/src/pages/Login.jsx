// Imports for icons, navigation, toast, and auth context
import React, { useState } from 'react'
import { FaEnvelope, FaLock } from 'react-icons/fa'
import { IoEye, IoEyeOff } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'
import { toast, Toaster } from 'react-hot-toast'
import axios from 'axios'
import { useAuth } from '../context/authContext'

const Login = () => {
  // UI state
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const { login } = useAuth() // From context: stores logged-in user

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Simple form validation
    if (!email || !password) {
      toast.error('Please fill in all fields')
      return
    }

    try {
      // Make login request
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password,
      })

      toast.success('Login successful!')

      // Save to auth context and local storage
      login(response.data.user)
      localStorage.setItem('token', response.data.token)

      // Redirect based on user role
      if (response.data.user.role === 'admin') {
        setTimeout(() => navigate('/admin-dashboard'), 10)
      } else {
        setTimeout(() => navigate('/employee-dashboard'), 10)
      }

    } catch (error) {
      const message = error.response?.data?.error || 'Login failed. Please check your credentials.'
      toast.error(message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4">
      <Toaster position="top-center" reverseOrder={false} /> {/* Toast container */}

      <div className="bg-[#1c1c1c] p-8 sm:p-10 rounded-2xl shadow-2xl w-full max-w-md sm:max-w-lg border border-yellow-600">
        <h2 className="text-3xl font-bold text-center text-yellow-400 mb-2">
          Employee Management System
        </h2>
        <h4 className="text-xl font-semibold text-center text-yellow-300 mb-6">
          Login
        </h4>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-yellow-200 font-medium mb-1">
              Email
            </label>
            <div className="flex items-center border border-yellow-700 rounded-lg px-3 py-2 bg-black focus-within:ring-2 focus-within:ring-yellow-500">
              <FaEnvelope className="text-yellow-400 mr-2" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-transparent outline-none text-yellow-100 placeholder-yellow-500 text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-yellow-200 font-medium mb-1">
              Password
            </label>
            <div className="flex items-center border border-yellow-700 rounded-lg px-3 py-2 bg-black focus-within:ring-2 focus-within:ring-yellow-500">
              <FaLock className="text-yellow-400 mr-2" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-transparent outline-none text-yellow-100 placeholder-yellow-500 text-sm sm:text-base"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 text-yellow-400 hover:text-yellow-300"
              >
                {showPassword ? <IoEyeOff /> : <IoEye />}
              </button>
            </div>

            <div className="text-right mt-1">
              <Link to="/forgot-password" className="text-sm text-yellow-500 hover:underline">
                Forgot Password?
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-500 text-black py-2 rounded-lg font-semibold hover:bg-yellow-400 transition duration-300 text-sm sm:text-base"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
