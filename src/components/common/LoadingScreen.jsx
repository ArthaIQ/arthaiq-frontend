export default function LoadingScreen({ label = 'Loading ArthaIQ…' }) {
  return (
    <div className="flex h-full min-h-[60vh] w-full flex-col items-center justify-center gap-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-white font-bold text-2xl animate-pulse">
        A
      </div>
      <div className="flex items-center gap-2 text-slate-500">
        <span className="h-2 w-2 rounded-full bg-accent typing-dot" style={{ animationDelay: '0ms' }} />
        <span className="h-2 w-2 rounded-full bg-accent typing-dot" style={{ animationDelay: '150ms' }} />
        <span className="h-2 w-2 rounded-full bg-accent typing-dot" style={{ animationDelay: '300ms' }} />
        <span className="ml-2 text-sm">{label}</span>
      </div>
    </div>
  )
}
