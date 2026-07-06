const IMPACT_CLASSES = {
  High: 'bg-score-high/10 text-score-high',
  Medium: 'bg-score-mid/10 text-score-mid',
  Low: 'bg-slate-200 text-slate-500',
}

export default function RecommendationCards({ recommendations = [] }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {recommendations.map((rec) => (
        <div key={rec.rank} className="flex flex-col rounded-xl border border-slate-200 bg-card p-4 shadow-card">
          <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
            {rec.rank}
          </div>
          <p className="mb-1 text-sm font-bold text-slate-900">{rec.action}</p>
          <p className="mb-3 flex-1 text-xs text-slate-500">{rec.rationale}</p>
          <div className="flex items-center justify-between text-xs">
            <span className={`rounded-full px-2 py-0.5 font-semibold ${IMPACT_CLASSES[rec.estimated_impact] || IMPACT_CLASSES.Low}`}>
              {rec.estimated_impact} impact
            </span>
            <span className="text-slate-400">{rec.timeframe}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
