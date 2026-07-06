import { Radar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

const LABELS = {
  liquidity: 'Liquidity',
  growth: 'Growth',
  compliance: 'Compliance',
  cashflow: 'Cash Flow',
  creditworthiness: 'Creditworthiness',
  digital_adoption: 'Digital',
  operational: 'Operational',
}

export default function DimensionRadar({ dimensions }) {
  if (!dimensions) return null

  const keys = Object.keys(LABELS).filter((k) => k in dimensions)
  const data = {
    labels: keys.map((k) => LABELS[k]),
    datasets: [
      {
        label: 'Health Dimensions',
        data: keys.map((k) => dimensions[k]),
        backgroundColor: 'rgba(46, 134, 171, 0.2)',
        borderColor: '#2E86AB',
        borderWidth: 2,
        pointBackgroundColor: '#2E86AB',
        pointRadius: 3,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: (ctx) => `${ctx.label}: ${ctx.raw}/100` } },
    },
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: { stepSize: 25, backdropColor: 'transparent', color: '#94A3B8', font: { size: 10 } },
        grid: { color: '#E2E8F0' },
        angleLines: { color: '#E2E8F0' },
        pointLabels: { color: '#334155', font: { size: 12, weight: '600' } },
      },
    },
  }

  return (
    <div className="h-72 w-full">
      <Radar data={data} options={options} />
    </div>
  )
}
