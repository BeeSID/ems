import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const userContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const login = (userData) => {
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        setLoading(false)
        return
      }

      try {
        const response = await axios.get('http://localhost:3000/api/auth/verify', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.data.success) {
          setUser(response.data.user)
        } else {
          setUser(null)
          setLoading(false)
        }
      } catch (error) {
        console.error('Verification failed:', error.message)
        setUser(null)
        logout()
      } finally {
        setLoading(false)
      }
    }

    verifyUser()
  }, [])

  return (
    <userContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </userContext.Provider>
  )
}

export const useAuth = () => useContext(userContext)
