import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip)

function humanize(feature, fallbackLabel) {
  if (fallbackLabel) return fallbackLabel
  return feature
    .split('_')
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(' ')
}

export default function ShapWaterfall({ shapValues = [] }) {
  const top8 = [...shapValues]
    .sort((a, b) => Math.abs(b.value) - Math.abs(a.value))
    .slice(0, 8)
    .sort((a, b) => a.value - b.value) // ascending so largest bars read top-to-bottom nicely

  const data = {
    labels: top8.map((f) => humanize(f.feature, f.label)),
    datasets: [
      {
        data: top8.map((f) => f.value),
        backgroundColor: top8.map((f) => (f.value >= 0 ? '#16A34A' : '#DC2626')),
        borderRadius: 4,
        barThickness: 18,
      },
    ],
  }

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.raw >= 0 ? '+' : ''}${ctx.raw} impact on score`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: '#F1F5F9' },
        ticks: { color: '#94A3B8', font: { size: 11 } },
      },
      y: {
        grid: { display: false },
        ticks: { color: '#334155', font: { size: 12 } },
      },
    },
  }

  return (
    <div>
      <div className="mb-2 flex items-center gap-4 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-score-high" /> Improves score
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-score-low" /> Hurts score
        </span>
      </div>
      <div style={{ height: `${top8.length * 40 + 20}px` }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  )
}
