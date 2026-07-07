import { useEffect, useRef, useState } from 'react'
import { Send } from 'lucide-react'
import MessageBubble from './MessageBubble'
import TypingIndicator from './TypingIndicator'
import { copilot } from '../../api/client'
import { mockCopilotReply } from '../../data/mockData'
import { useStore } from '../../store/useStore'

const SUGGESTED_QUESTIONS = [
  "What's the biggest repayment risk for this business?",
  'What would improve this score fastest?',
  'How does this compare to similar businesses?',
]

export default function CopilotChat({ msmeId }) {
  const { creditPackage, chatHistory, appendChatMessage } = useStore()
  const messages = chatHistory[msmeId] || []
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, sending])

  async function send(text) {
    const message = text.trim()
    if (!message || sending) return

    appendChatMessage(msmeId, { role: 'user', content: message })
    setInput('')
    setSending(true)

    try {
      const { data } = await copilot.chat(msmeId, message, messages)
      const reply = data?.data?.reply || data?.reply
      if (!reply) throw new Error('Empty reply')
      appendChatMessage(msmeId, { role: 'assistant', content: reply })
    } catch (err) {
      console.warn('Copilot API unavailable, using local fallback.', err)
      const reply = mockCopilotReply(message, creditPackage)
      appendChatMessage(msmeId, { role: 'assistant', content: reply })
    } finally {
      setSending(false)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    send(input)
  }

  return (
    <div className="flex h-[70vh] flex-col rounded-xl border border-slate-200 bg-card shadow-card">
      <div className="flex-1 space-y-3 overflow-y-auto p-5">
        {messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
            <p className="text-sm text-slate-400">
              Ask anything about {creditPackage?.businessName || 'this business'} — answers stay
              grounded in its own data.
            </p>
            <div className="flex flex-col gap-2">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-600 hover:border-accent hover:text-accent"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <MessageBubble key={i} role={m.role} content={m.content} />
        ))}
        {sending && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-slate-200 p-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask the Credit Copilot…"
          className="flex-1 rounded-full border border-slate-300 bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
        />
        <button
          type="submit"
          disabled={!input.trim() || sending}
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  )
}
