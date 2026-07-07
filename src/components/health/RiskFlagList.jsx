const SEVERITY_ORDER = { RED: 0, YELLOW: 1, GREEN: 2 }
const SEVERITY_DOT = { RED: 'bg-score-low', YELLOW: 'bg-score-mid', GREEN: 'bg-score-high' }

export default function RiskFlagList({ flags = [] }) {
  const sorted = [...flags].sort((a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity])

  if (sorted.length === 0) {
    return <p className="text-sm text-slate-400">No risk flags for this business.</p>
  }

  return (
    <ul className="space-y-3">
      {sorted.map((flag, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className={`mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full ${SEVERITY_DOT[flag.severity]}`} />
          <div>
            <p className="text-sm font-semibold text-slate-800">{flag.label}</p>
            <p className="text-xs text-slate-500">{flag.detail}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
