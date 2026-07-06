import { ShieldCheck, TrendingUp, AlertCircle, XCircle } from 'lucide-react'

const TIER_CONFIG = {
  STRONG: { label: 'Strong', icon: ShieldCheck, classes: 'bg-score-high/10 text-score-high' },
  CREDIT_READY: { label: 'Credit Ready', icon: TrendingUp, classes: 'bg-accent/10 text-accent' },
  DEVELOPING: { label: 'Developing', icon: AlertCircle, classes: 'bg-score-mid/10 text-score-mid' },
  NOT_READY: { label: 'Not Ready', icon: XCircle, classes: 'bg-score-low/10 text-score-low' },
}

export default function CreditReadinessBadge({ tier, size = 'md' }) {
  const config = TIER_CONFIG[tier] || TIER_CONFIG.DEVELOPING
  const Icon = config.icon
  const isSmall = size === 'sm'

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${config.classes} ${
        isSmall ? 'px-2.5 py-1 text-xs' : 'px-4 py-1.5 text-sm'
      }`}
    >
      <Icon size={isSmall ? 12 : 16} />
      {config.label}
    </span>
  )
}
