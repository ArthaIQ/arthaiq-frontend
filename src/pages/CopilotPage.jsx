import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import AppHeader from '../components/common/AppHeader'
import CopilotChat from '../components/copilot/CopilotChat'
import { useStore } from '../store/useStore'
import { DEMO_PROFILES, buildMockCreditPackage } from '../data/mockData'
import { msme, scoring } from '../api/client'

export default function CopilotPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { creditPackage, setCreditPackage, setActiveMsme } = useStore()

  useEffect(() => {
    if (creditPackage && String(creditPackage.msmeId) === String(id)) return

    let cancelled = false
    async function load() {
      try {
        const profileRes = await msme.getById(id)
        const profile = profileRes?.data?.data || profileRes?.data
        const latest = await scoring.getLatest(id)
        const scoreData = latest?.data?.data || latest?.data
        if (cancelled) return
        setActiveMsme(profile)
        setCreditPackage(scoreData)
      } catch {
        const profile = DEMO_PROFILES.find((p) => String(p.id) === String(id)) || DEMO_PROFILES[0]
        const mockPkg = buildMockCreditPackage(profile)
        if (cancelled) return
        setActiveMsme(profile)
        setCreditPackage(mockPkg)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [id]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen bg-surface">
      <AppHeader crumb="Credit Copilot" />

      <main className="mx-auto max-w-3xl px-6 py-8">
        <button
          onClick={() => navigate(`/msme/${id}/health`)}
          className="mb-4 flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-primary"
        >
          <ArrowLeft size={16} />
          Back to Health Card
        </button>

        <div className="mb-4">
          <h1 className="text-2xl font-bold text-slate-900">Credit Copilot</h1>
          <p className="text-sm text-slate-500">
            {creditPackage?.businessName ? `Grounded in ${creditPackage.businessName}'s data only.` : 'Loading business context…'}
          </p>
        </div>

        <CopilotChat msmeId={id} />
      </main>
    </div>
  )
}
