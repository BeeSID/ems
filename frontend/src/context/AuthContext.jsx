import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

// Create a context to share auth state across components
const userContext = createContext()

// AuthProvider component wraps around your entire app (usually in main.jsx or App.jsx)
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null) // Stores current user info
  const [loading, setLoading] = useState(true) // Indicates if auth check is in progress

  // Called on successful login to set user data globally
  const login = (userData) => {
    setUser(userData)
  }

  // Clears user info and token on logout
  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  // Runs once on mount to verify token and set user if valid
  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        setLoading(false) // No token, no need to verify
        return
      }

      try {
        const response = await axios.get('http://localhost:3000/api/auth/verify', {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token to request
          },
        })

        if (response.data.success) {
          setUser(response.data.user) // Set user if token is valid
        } else {
          setUser(null)
          setLoading(false)
        }
      } catch (error) {
        console.error('Verification failed:', error.message)
        setUser(null)
        logout() // If error, clear auth
      } finally {
        setLoading(false)
      }
    }

    verifyUser()
  }, [])

  // Provide context values to all children components
  return (
    <userContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </userContext.Provider>
  )
}

// Custom hook for easy access to auth context
export const useAuth = () => useContext(userContext)
