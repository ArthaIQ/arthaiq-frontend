export default function Logo({ withTagline = false, className = '' }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white font-bold text-lg">
        A
      </div>
      <div>
        <p className="text-lg font-bold leading-none text-primary">ArthaIQ</p>
        {withTagline && (
          <p className="text-xs leading-none text-slate-500 mt-1">Credit Decision Support</p>
        )}
      </div>
    </div>
  )
}
