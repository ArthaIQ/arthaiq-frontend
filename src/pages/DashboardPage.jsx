import { useEffect, useMemo, useState } from 'react'
import AppHeader from '../components/common/AppHeader'
import LoadingScreen from '../components/common/LoadingScreen'
import StatCards from '../components/dashboard/StatCards'
import SearchBar from '../components/dashboard/SearchBar'
import MsmeTable from '../components/dashboard/MsmeTable'
import { msme } from '../api/client'
import { DEMO_PROFILES } from '../data/mockData'

export default function DashboardPage() {
  const [profiles, setProfiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [usingDemoData, setUsingDemoData] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      try {
        const { data } = await msme.getDemo()
        const list = data?.data || data
        if (!cancelled && Array.isArray(list) && list.length > 0) {
          setProfiles(list)
        } else if (!cancelled) {
          throw new Error('Empty response')
        }
      } catch (err) {
        console.warn('Falling back to local demo profiles.', err)
        if (!cancelled) {
          setProfiles(DEMO_PROFILES)
          setUsingDemoData(true)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return profiles
    return profiles.filter((p) =>
      [p.businessName, p.sector, p.city].some((field) => field?.toLowerCase().includes(q))
    )
  }, [profiles, query])

  return (
    <div className="min-h-screen bg-surface">
      <AppHeader crumb="Dashboard" />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-6 flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-slate-900">MSME Portfolio</h1>
          <p className="text-sm text-slate-500">
            Select a business to open its full credit health assessment.
          </p>
        </div>

        {loading ? (
          <LoadingScreen label="Loading MSME portfolio…" />
        ) : (
          <div className="space-y-6">
            {usingDemoData && (
              <div className="rounded-lg border border-gold/40 bg-gold/10 px-4 py-2.5 text-sm text-primary">
                Backend not reachable — showing local demo data so you can keep exploring.
              </div>
            )}

            <StatCards profiles={profiles} />

            <div className="flex items-center justify-between">
              <SearchBar value={query} onChange={setQuery} />
              <p className="text-sm text-slate-400">{filtered.length} of {profiles.length} businesses</p>
            </div>

            <MsmeTable profiles={filtered} />
          </div>
        )}
      </main>
    </div>
  )
}
