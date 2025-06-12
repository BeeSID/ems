import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'

// A wrapper component to restrict access based on user roles
const RoleBaseRoutes = ({ children, requiredRole }) => {
  const { user } = useAuth() // Get the current authenticated user

  // If no user or the user's role is not in the allowed roles, redirect to login
  if (!user || !requiredRole.includes(user.role)) {
    return <Navigate to="/login" replace />
  }

  // If user has the required role, render the protected children routes
  return children
}

export default RoleBaseRoutes
