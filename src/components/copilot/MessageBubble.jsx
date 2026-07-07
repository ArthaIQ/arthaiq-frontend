export default function MessageBubble({ role, content }) {
  const isUser = role === 'user'
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? 'rounded-br-sm bg-primary text-white'
            : 'rounded-bl-sm border border-slate-200 bg-white text-slate-700 shadow-sm'
        }`}
      >
        {content}
      </div>
    </div>
  )
}
