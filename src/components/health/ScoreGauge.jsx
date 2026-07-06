// Large SVG arc gauge, 0-100, color-coded by tier.
// 0-40 red, 41-65 amber, 66-80 blue, 81-100 green.

function colorForScore(score) {
  if (score >= 81) return '#16A34A'
  if (score >= 66) return '#2E86AB'
  if (score >= 41) return '#F59E0B'
  return '#DC2626'
}

function tierLabel(score) {
  if (score >= 81) return 'Strong'
  if (score >= 66) return 'Credit Ready'
  if (score >= 41) return 'Developing'
  return 'Not Ready'
}

export default function ScoreGauge({ score = 0 }) {
  const size = 200
  const stroke = 16
  const radius = (size - stroke) / 2
  const circumference = Math.PI * radius // half circle
  const clamped = Math.max(0, Math.min(100, score))
  const progress = (clamped / 100) * circumference
  const color = colorForScore(clamped)

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size / 2 + stroke / 2} viewBox={`0 0 ${size} ${size / 2 + stroke / 2}`}>
        <path
          d={`M ${stroke / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - stroke / 2} ${size / 2}`}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={stroke}
          strokeLinecap="round"
        />
        <path
          d={`M ${stroke / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - stroke / 2} ${size / 2}`}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${progress} ${circumference}`}
          style={{ transition: 'stroke-dasharray 0.6s ease' }}
        />
      </svg>
      <div className="-mt-4 flex flex-col items-center">
        <p className="text-4xl font-extrabold text-slate-900">{clamped}</p>
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">/ 100</p>
      </div>
      <p className="mt-1 text-sm font-semibold" style={{ color }}>
        {tierLabel(clamped)}
      </p>
    </div>
  )
}
