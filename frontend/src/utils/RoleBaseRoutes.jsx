import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'

const RoleBaseRoutes = ({ children, requiredRole }) => {
  const { user } = useAuth()

  if (!user || !requiredRole.includes(user.role)) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default RoleBaseRoutes
    