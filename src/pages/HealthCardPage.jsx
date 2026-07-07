import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MessageCircle, RefreshCw } from 'lucide-react'
import AppHeader from '../components/common/AppHeader'
import LoadingScreen from '../components/common/LoadingScreen'
import ScoreGauge from '../components/health/ScoreGauge'
import CreditReadinessBadge from '../components/health/CreditReadinessBadge'
import DimensionRadar from '../components/health/DimensionRadar'
import ShapWaterfall from '../components/health/ShapWaterfall'
import RiskFlagList from '../components/health/RiskFlagList'
import RecommendationCards from '../components/health/RecommendationCards'
import LoanRecommendation from '../components/health/LoanRecommendation'
import { msme, scoring } from '../api/client'
import { DEMO_PROFILES, buildMockCreditPackage } from '../data/mockData'
import { useStore } from '../store/useStore'

export default function HealthCardPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { setActiveMsme, setCreditPackage, creditPackage } = useStore()
  const [loading, setLoading] = useState(true)
  const [usingDemoData, setUsingDemoData] = useState(false)
  const [pkg, setPkg] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      try {
        const profileRes = await msme.getById(id)
        const profile = profileRes?.data?.data || profileRes?.data

        let scoreData
        try {
          const latest = await scoring.getLatest(id)
          scoreData = latest?.data?.data || latest?.data
        } catch {
          const triggered = await scoring.score(id)
          scoreData = triggered?.data?.data || triggered?.data
        }

        if (cancelled) return
        setActiveMsme(profile)
        setPkg(scoreData)
        setCreditPackage(scoreData)
      } catch (err) {
        console.warn('Falling back to local mock credit package.', err)
        const profile = DEMO_PROFILES.find((p) => String(p.id) === String(id)) || DEMO_PROFILES[0]
        const mockPkg = buildMockCreditPackage(profile)
        if (cancelled) return
        setActiveMsme(profile)
        setPkg(mockPkg)
        setCreditPackage(mockPkg)
        setUsingDemoData(true)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [id, setActiveMsme, setCreditPackage])

  const data = pkg || creditPackage

  if (loading) {
    return (
      <div className="min-h-screen bg-surface">
        <AppHeader crumb="Health Card" />
        <LoadingScreen label="Scoring business…" />
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-surface">
        <AppHeader crumb="Health Card" />
        <div className="mx-auto max-w-7xl px-6 py-16 text-center text-slate-500">
          Could not load this business. <button onClick={() => navigate('/dashboard')} className="text-accent underline">Back to dashboard</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface">
      <AppHeader crumb={data.businessName} />

      <main className="mx-auto max-w-7xl space-y-6 px-6 py-8">
        {usingDemoData && (
          <div className="rounded-lg border border-gold/40 bg-gold/10 px-4 py-2.5 text-sm text-primary">
            Backend not reachable — showing a locally generated demo score.
          </div>
        )}

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{data.businessName}</h1>
            <p className="text-sm text-slate-500">{data.sector} &middot; {data.city}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/msme/${id}/copilot`)}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90"
            >
              <MessageCircle size={16} />
              Ask Credit Copilot
            </button>
          </div>
        </div>

        {/* Row 1: Score Gauge | Readiness Badge + Loan Rec */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-card p-6 shadow-card">
            <ScoreGauge score={data.compositeScore} />
          </div>
          <div className="flex flex-col justify-center gap-4 rounded-xl border border-slate-200 bg-card p-6 shadow-card lg:col-span-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Credit Readiness</p>
            <CreditReadinessBadge tier={data.creditTier} />
          </div>
          <div className="lg:col-span-1">
            <LoanRecommendation recommendation={data.loanRecommendation} />
          </div>
        </div>

        {/* Row 2: Dimension Radar | Risk Flags */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-card p-6 shadow-card">
            <p className="mb-3 text-sm font-bold text-slate-800">7-Dimension Health Radar</p>
            <DimensionRadar dimensions={data.dimensions} />
          </div>
          <div className="rounded-xl border border-slate-200 bg-card p-6 shadow-card">
            <p className="mb-3 text-sm font-bold text-slate-800">Risk Flags</p>
            <RiskFlagList flags={data.riskFlags} />
          </div>
        </div>

        {/* Row 3: SHAP Waterfall */}
        <div className="rounded-xl border border-slate-200 bg-card p-6 shadow-card">
          <p className="mb-3 text-sm font-bold text-slate-800">Why This Score — SHAP Explanation</p>
          <ShapWaterfall shapValues={data.shapValues} />
        </div>

        {/* Row 4: Recommendations */}
        <div>
          <p className="mb-3 text-sm font-bold text-slate-800">Recommended Actions</p>
          <RecommendationCards recommendations={data.recommendations} />
        </div>

        {/* Row 5: AI Narrative */}
        <div className="rounded-xl border-l-4 border-accent bg-card p-6 shadow-card">
          <p className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-800">
            <RefreshCw size={14} className="text-accent" />
            AI Credit Summary
          </p>
          <p className="whitespace-pre-line text-sm italic leading-relaxed text-slate-600">
            {data.aiNarrative}
          </p>
        </div>
      </main>
    </div>
  )
}
