import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'

// This component protects routes that require the user to be authenticated
const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth() // Get user and loading state from Auth context

  // While verifying token/user info, show loading message
  if (loading) return <p>Loading...</p>

  // If user is not logged in, redirect to login page
  if (!user) return <Navigate to="/login" replace />

  // If user is authenticated, allow access to the route
  return children
}

export default PrivateRoutes
