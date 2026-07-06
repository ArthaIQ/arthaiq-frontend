export default function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-slate-400 typing-dot" style={{ animationDelay: '0ms' }} />
        <span className="h-1.5 w-1.5 rounded-full bg-slate-400 typing-dot" style={{ animationDelay: '150ms' }} />
        <span className="h-1.5 w-1.5 rounded-full bg-slate-400 typing-dot" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  )
}
