'use client'

import { useEffect, useState } from 'react'

const lines = [
  { prompt: '$ whoami', response: 'Rafael Ramos — Director of Software Engineering' },
  { prompt: '$ cat roles.txt', response: 'Founding member @ OpenMetal, Founding member @ BoldGrid' },
  { prompt: '$ uptime', response: '13 years, 0 burnouts, still shipping' },
]

export default function TerminalIntro() {
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      i++
      setVisibleLines(i)
      if (i >= lines.length) clearInterval(interval)
    }, 600)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="terminal">
      <div className="terminal__header">
        <span className="terminal__dot terminal__dot--red" />
        <span className="terminal__dot terminal__dot--yellow" />
        <span className="terminal__dot terminal__dot--green" />
        <span className="terminal__title">rafael@portfolio ~ </span>
      </div>
      <div className="terminal__body">
        {lines.map((line, i) => (
          <div key={i} className={`terminal__line ${i < visibleLines ? 'terminal__line--visible' : ''}`}>
            <span className="terminal__prompt">{line.prompt}</span>
            <span className="terminal__response">{line.response}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
