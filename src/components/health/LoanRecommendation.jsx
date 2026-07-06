function formatINR(amount) {
  if (!amount) return '₹0'
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`
  return `₹${amount.toLocaleString('en-IN')}`
}

export default function LoanRecommendation({ recommendation }) {
  if (!recommendation) return null
  const { product, amount_min, amount_max, tenure, rationale } = recommendation
  const notRecommended = product === 'Not Recommended'

  return (
    <div className="rounded-xl border-2 border-gold/60 bg-gradient-to-br from-gold/5 to-white p-5">
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gold">
        Loan Recommendation
      </p>
      <p className="mb-2 text-lg font-bold text-slate-900">{product}</p>
      {!notRecommended && (
        <p className="mb-1 text-2xl font-extrabold text-primary">
          {formatINR(amount_min)} &ndash; {formatINR(amount_max)}
        </p>
      )}
      {!notRecommended && <p className="mb-3 text-xs text-slate-500">Tenure: {tenure}</p>}
      <p className="text-sm text-slate-600">{rationale}</p>
    </div>
  )
}
