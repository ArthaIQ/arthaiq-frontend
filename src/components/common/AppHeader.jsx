import { useNavigate } from 'react-router-dom'
import { LogOut, LayoutDashboard } from 'lucide-react'
import Logo from './Logo'
import { useStore } from '../../store/useStore'

export default function AppHeader({ crumb }) {
  const navigate = useNavigate()
  const { user, clear } = useStore()

  function handleLogout() {
    clear()
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-3 rounded-md focus-visible:outline-2"
        >
          <Logo />
          {crumb && (
            <>
              <span className="text-slate-300">/</span>
              <span className="text-sm font-medium text-slate-600">{crumb}</span>
            </>
          )}
        </button>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="hidden items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-primary sm:flex"
          >
            <LayoutDashboard size={16} />
            Dashboard
          </button>
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold leading-none text-slate-800">
              {user?.name || 'Loan Officer'}
            </p>
            <p className="mt-0.5 text-xs leading-none text-slate-400">
              {user?.role || 'LOAN_OFFICER'}
            </p>
          </div>
          <button
            onClick={handleLogout}
            title="Log out"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-score-low"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  )
}
