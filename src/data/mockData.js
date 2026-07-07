// Demo/offline data. ArthaIQ's backend has a matching TemplateFallbackProvider
// so the same "always-works" philosophy is mirrored on the frontend: if the
// API is unreachable, the UI still demos cleanly on this data.

export const DEMO_PROFILES = [
  { id: 1, gstin: '24ABCDE1234F1Z5', businessName: 'Mohammed Textile Traders', sector: 'Textile', city: 'Surat', score: 74, tier: 'CREDIT_READY' },
  { id: 2, gstin: '27PQRST5678G2Z1', businessName: 'Priya Pharma Distributors', sector: 'Pharma', city: 'Pune', score: 88, tier: 'STRONG' },
  { id: 3, gstin: '27LMNOP9012H3Z4', businessName: 'Ravi Food Processing', sector: 'Food', city: 'Mumbai', score: 52, tier: 'DEVELOPING' },
  { id: 4, gstin: '24WXYZA3456I4Z7', businessName: 'Anita Fashion Retail', sector: 'Retail', city: 'Ahmedabad', score: 38, tier: 'NOT_READY' },
  { id: 5, gstin: '33BCDEF7890J5Z2', businessName: 'Suresh Engineering Works', sector: 'Manufacturing', city: 'Chennai', score: 66, tier: 'CREDIT_READY' },
  { id: 6, gstin: '27GHIJK2345K6Z9', businessName: 'Deepa Organic Farms', sector: 'Agriculture', city: 'Nashik', score: 81, tier: 'STRONG' },
]

const FEATURE_LABELS = {
  gst_filing_rate_12m: 'GST Filing Rate',
  gst_delay_avg_days: 'GST Filing Delay',
  itc_claim_ratio: 'ITC Claim Ratio',
  digital_revenue_share: 'Digital Revenue Share',
  balance_volatility: 'Bank Balance Volatility',
  inflow_outflow_ratio: 'Inflow/Outflow Ratio',
  cheque_bounce_rate: 'Cheque Bounce Rate',
  epfo_compliance_rate: 'EPFO Compliance',
  revenue_trend_6m: 'Revenue Trend (6M)',
  existing_emi_burden_pct: 'Existing EMI Burden',
  loan_repayment_rate: 'Loan Repayment Rate',
  digital_maturity_index: 'Digital Maturity Index',
}

function dimensionsFromScore(score) {
  const j = () => Math.round((Math.random() - 0.5) * 16)
  const c = (v) => Math.max(5, Math.min(100, v))
  return {
    liquidity: c(score + j()),
    growth: c(score + j()),
    compliance: c(score + j()),
    cashflow: c(score + j()),
    creditworthiness: c(score + j()),
    digital_adoption: c(score + j()),
    operational: c(score + j()),
  }
}

function shapFromScore(score) {
  const keys = Object.keys(FEATURE_LABELS)
  const positive = score >= 55
  return keys.map((key, i) => {
    const magnitude = +(Math.random() * 6 + 1).toFixed(1)
    const sign = i % 3 === 0 ? -1 : positive ? 1 : -1
    return { feature: key, label: FEATURE_LABELS[key], value: +(magnitude * sign).toFixed(1) }
  })
}

function riskFlagsFromScore(score) {
  if (score >= 81) {
    return [
      { severity: 'GREEN', label: 'GST Compliance', detail: 'Consistently filed on time for 12 months' },
      { severity: 'GREEN', label: 'Cash Flow', detail: 'Low volatility, healthy inflow/outflow ratio' },
    ]
  }
  if (score >= 61) {
    return [
      { severity: 'YELLOW', label: 'Digital Adoption', detail: 'UPI usage below sector median' },
      { severity: 'GREEN', label: 'Loan Repayment', detail: 'No missed EMIs in repayment history' },
    ]
  }
  if (score >= 41) {
    return [
      { severity: 'RED', label: 'Cash Flow Volatility', detail: 'Monthly inflow variance above safe threshold' },
      { severity: 'YELLOW', label: 'GST Filing Delay', detail: 'Average delay of 18 days over last 12 months' },
      { severity: 'GREEN', label: 'EPFO Compliance', detail: 'Consistent employee contributions' },
    ]
  }
  return [
    { severity: 'RED', label: 'Cheque Bounce Rate', detail: 'Above acceptable threshold for last 2 quarters' },
    { severity: 'RED', label: 'Revenue Trend', detail: 'Declining revenue over the last 6 months' },
    { severity: 'YELLOW', label: 'Digital Footprint', detail: 'Limited UPI/digital transaction history' },
  ]
}

function recommendationsFromScore(score) {
  if (score >= 81) {
    return [
      { rank: 1, action: 'Offer pre-approved working capital line', rationale: 'Strong compliance and cash flow support a fast-tracked offer', estimated_impact: 'High', timeframe: 'Immediate' },
      { rank: 2, action: 'Cross-sell trade credit product', rationale: 'Growth trend suggests expanding purchase needs', estimated_impact: 'Medium', timeframe: '1-3 months' },
      { rank: 3, action: 'Enroll in priority relationship banking', rationale: 'Sustained STRONG tier over multiple cycles', estimated_impact: 'Medium', timeframe: '3-6 months' },
    ]
  }
  if (score >= 61) {
    return [
      { rank: 1, action: 'Approve working capital loan with standard terms', rationale: 'Compliance and repayment history support approval', estimated_impact: 'High', timeframe: 'Immediate' },
      { rank: 2, action: 'Encourage UPI adoption for supplier payments', rationale: 'Improves digital footprint for future assessments', estimated_impact: 'Medium', timeframe: '1-3 months' },
      { rank: 3, action: 'Review in 6 months for tier upgrade', rationale: 'Trending toward STRONG tier', estimated_impact: 'Low', timeframe: '6 months' },
    ]
  }
  if (score >= 41) {
    return [
      { rank: 1, action: 'Offer smaller ticket-size loan with monitoring', rationale: 'Cash flow volatility warrants a conservative exposure', estimated_impact: 'Medium', timeframe: 'Immediate' },
      { rank: 2, action: 'Recommend GST filing discipline program', rationale: 'Reducing filing delay directly improves compliance score', estimated_impact: 'High', timeframe: '1-3 months' },
      { rank: 3, action: 'Re-assess after 2 GST cycles', rationale: 'Track improvement before increasing exposure', estimated_impact: 'Medium', timeframe: '3-6 months' },
    ]
  }
  return [
    { rank: 1, action: 'Defer lending decision', rationale: 'Multiple red flags indicate high current risk', estimated_impact: 'High', timeframe: 'Immediate' },
    { rank: 2, action: 'Refer to financial literacy / advisory program', rationale: 'Business fundamentals need strengthening first', estimated_impact: 'Medium', timeframe: '1-3 months' },
    { rank: 3, action: 'Re-score in 6 months', rationale: 'Allow time for revenue and compliance trend to stabilize', estimated_impact: 'Low', timeframe: '6 months' },
  ]
}

function loanRecFromScore(score, tier) {
  if (score >= 81) return { product: 'Working Capital Term Loan', amount_min: 1500000, amount_max: 2500000, tenure: '24 months', rationale: 'Strong liquidity and compliance support a higher exposure at standard rates.' }
  if (score >= 61) return { product: 'Working Capital Term Loan', amount_min: 800000, amount_max: 1500000, tenure: '18 months', rationale: 'Healthy fundamentals support standard working capital financing.' }
  if (score >= 41) return { product: 'Micro Working Capital Loan', amount_min: 200000, amount_max: 500000, tenure: '12 months', rationale: 'Conservative exposure recommended pending compliance improvement.' }
  return { product: 'Not Recommended', amount_min: 0, amount_max: 0, tenure: '-', rationale: 'Current risk profile does not support a lending recommendation.' }
}

const NARRATIVES = {
  STRONG: (name, sector, city) =>
    `${name} is a ${sector.toLowerCase()} business based in ${city} with a strong financial profile. The business demonstrates consistent GST compliance, healthy cash flow stability, and steady revenue growth over the past two quarters.\n\nKey strengths include disciplined statutory filing, low balance volatility, and a well-managed inflow-to-outflow ratio, all of which point to reliable operating cash generation.\n\nNo material risk factors were identified in this assessment cycle. The business is well positioned for an expanded credit relationship.`,
  CREDIT_READY: (name, sector, city) =>
    `${name} operates in the ${sector.toLowerCase()} sector out of ${city} and shows a credit-ready financial profile. GST filings are largely on schedule and loan repayment history is clean.\n\nStrengths include stable cash flow and consistent statutory compliance. A moderate gap in digital transaction adoption was noted relative to sector peers.\n\nOverall, the business supports a standard working capital facility with routine monitoring.`,
  DEVELOPING: (name, sector, city) =>
    `${name}, a ${sector.toLowerCase()} business in ${city}, shows a developing financial profile with room for improvement. EPFO compliance and employee-related metrics remain a relative strength.\n\nKey concerns include elevated monthly cash flow variance and a GST filing delay averaging over two weeks, both of which increase near-term repayment risk.\n\nA smaller, closely monitored facility is recommended while compliance metrics are tracked over the next two filing cycles.`,
  NOT_READY: (name, sector, city) =>
    `${name} is a ${sector.toLowerCase()} business in ${city} currently assessed as not credit-ready. Multiple risk indicators were flagged in this cycle, including an elevated cheque bounce rate and a declining revenue trend.\n\nThe business shows limited digital transaction history, reducing confidence in the underlying cash flow data.\n\nLending is not recommended at this time; a re-assessment in six months is advised once trends stabilize.`,
}

export function buildMockCreditPackage(profile) {
  const dimensions = dimensionsFromScore(profile.score)
  const shapValues = shapFromScore(profile.score)
  return {
    msmeId: profile.id,
    businessName: profile.businessName,
    sector: profile.sector,
    city: profile.city,
    compositeScore: profile.score,
    creditTier: profile.tier,
    dimensions,
    shapValues,
    riskFlags: riskFlagsFromScore(profile.score),
    recommendations: recommendationsFromScore(profile.score),
    loanRecommendation: loanRecFromScore(profile.score, profile.tier),
    aiNarrative: NARRATIVES[profile.tier](profile.businessName, profile.sector, profile.city),
    scoredAt: new Date().toISOString(),
  }
}

export function mockCopilotReply(message, creditPackage) {
  const m = message.toLowerCase()
  if (!creditPackage) return "I don't have a scored business loaded yet. Open a Health Card first, then ask me anything about it."
  const { businessName, compositeScore, creditTier, riskFlags } = creditPackage
  if (m.includes('risk') || m.includes('concern')) {
    const top = riskFlags.find((f) => f.severity === 'RED') || riskFlags[0]
    return `The most significant flag for ${businessName} right now is "${top.label}" — ${top.detail}. I'd weigh this alongside the overall ${creditTier.replace('_', ' ').toLowerCase()} tier before finalizing a decision.`
  }
  if (m.includes('improve') || m.includes('better')) {
    return `The fastest lever for ${businessName} is usually GST filing discipline and reducing cash flow volatility — both feed directly into the compliance and cashflow dimensions of the score.`
  }
  if (m.includes('approve') || m.includes('reject') || m.includes('decision')) {
    return `I can support the decision with data, but the final call is always the loan officer's. Based on the current ${compositeScore}/100 score and ${creditTier.replace('_', ' ').toLowerCase()} tier, the data leans toward what's shown on the Health Card recommendation.`
  }
  if (m.includes('compare') || m.includes('similar') || m.includes('benchmark')) {
    return `${businessName} scores ${compositeScore}/100, which is ${compositeScore >= 65 ? 'above' : 'below'} the typical midpoint we see for similar-sized businesses in this sector.`
  }
  return `${businessName} currently holds a ${compositeScore}/100 score (${creditTier.replace('_', ' ')}). Ask me about specific risks, what would improve the score, or how it compares to similar businesses.`
}
