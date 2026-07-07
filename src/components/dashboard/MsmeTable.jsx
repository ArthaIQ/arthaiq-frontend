import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import CreditReadinessBadge from '../health/CreditReadinessBadge'

function scoreColor(score) {
  if (score >= 81) return 'text-score-high'
  if (score >= 61) return 'text-accent'
  if (score >= 41) return 'text-score-mid'
  return 'text-score-low'
}

export default function MsmeTable({ profiles }) {
  const navigate = useNavigate()

  if (profiles.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
        <p className="text-sm font-medium text-slate-600">No businesses match your search</p>
        <p className="mt-1 text-xs text-slate-400">Try a different name, sector, or city.</p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-card shadow-card">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-5 py-3 text-left font-semibold text-slate-500">Business</th>
            <th className="px-5 py-3 text-left font-semibold text-slate-500">Sector</th>
            <th className="px-5 py-3 text-left font-semibold text-slate-500">City</th>
            <th className="px-5 py-3 text-left font-semibold text-slate-500">Score</th>
            <th className="px-5 py-3 text-left font-semibold text-slate-500">Tier</th>
            <th className="px-5 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {profiles.map((p) => (
            <tr
              key={p.id}
              onClick={() => navigate(`/msme/${p.id}/health`)}
              className="cursor-pointer transition hover:bg-surface"
            >
              <td className="px-5 py-3.5 font-medium text-slate-900">{p.businessName}</td>
              <td className="px-5 py-3.5 text-slate-600">{p.sector}</td>
              <td className="px-5 py-3.5 text-slate-600">{p.city}</td>
              <td className={`px-5 py-3.5 font-bold ${scoreColor(p.score)}`}>{p.score}</td>
              <td className="px-5 py-3.5">
                <CreditReadinessBadge tier={p.tier} size="sm" />
              </td>
              <td className="px-5 py-3.5 text-right">
                <ArrowRight size={16} className="ml-auto text-slate-400" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
