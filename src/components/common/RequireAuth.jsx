import { Navigate, useLocation } from 'react-router-dom'
import { useStore } from '../../store/useStore'

export default function RequireAuth({ children }) {
  const token = useStore((s) => s.token)
  const location = useLocation()

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return children
}
