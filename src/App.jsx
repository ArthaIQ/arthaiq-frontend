import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import HealthCardPage from './pages/HealthCardPage'
import CopilotPage from './pages/CopilotPage'
import RequireAuth from './components/common/RequireAuth'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <DashboardPage />
          </RequireAuth>
        }
      />
      <Route
        path="/msme/:id/health"
        element={
          <RequireAuth>
            <HealthCardPage />
          </RequireAuth>
        }
      />
      <Route
        path="/msme/:id/copilot"
        element={
          <RequireAuth>
            <CopilotPage />
          </RequireAuth>
        }
      />

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
