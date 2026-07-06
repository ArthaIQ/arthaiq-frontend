import { Building2, TrendingUp, ShieldCheck, AlertTriangle } from 'lucide-react'

export default function StatCards({ profiles }) {
  const total = profiles.length
  const avgScore = total
    ? Math.round(profiles.reduce((sum, p) => sum + p.score, 0) / total)
    : 0
  const strongCount = profiles.filter((p) => p.tier === 'STRONG').length
  const notReadyCount = profiles.filter((p) => p.tier === 'NOT_READY').length

  const cards = [
    { label: 'Total MSMEs', value: total, icon: Building2, tone: 'text-primary bg-primary/10' },
    { label: 'Avg. Health Score', value: `${avgScore}/100`, icon: TrendingUp, tone: 'text-accent bg-accent/10' },
    { label: 'STRONG Tier', value: strongCount, icon: ShieldCheck, tone: 'text-score-high bg-score-high/10' },
    { label: 'NOT_READY Tier', value: notReadyCount, icon: AlertTriangle, tone: 'text-score-low bg-score-low/10' },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map(({ label, value, icon: Icon, tone }) => (
        <div key={label} className="rounded-xl border border-slate-200 bg-card p-4 shadow-card">
          <div className={`mb-3 flex h-9 w-9 items-center justify-center rounded-lg ${tone}`}>
            <Icon size={18} />
          </div>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
          <p className="text-xs text-slate-500">{label}</p>
        </div>
      ))}
    </div>
  )
}
