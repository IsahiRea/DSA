import { useState } from 'react'
import './CodeBlock.css'

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function highlightCode(code, language) {
  let match

  const patterns = language === 'python' ? [
    { regex: /#.*$/gm, type: 'comment' },
    { regex: /'''[\s\S]*?'''|"""[\s\S]*?"""/g, type: 'string' },
    { regex: /'[^']*'|"[^"]*"/g, type: 'string' },
    { regex: /\b(def|class|return|if|elif|else|for|while|in|is|not|and|or|import|from|as|try|except|raise|with|lambda|pass|break|continue|global|nonlocal|assert|yield|del|async|await)\b/g, type: 'keyword' },
    { regex: /\b(True|False|None)\b/g, type: 'constant' },
    { regex: /\b(self|cls)\b/g, type: 'self' },
    { regex: /\b\d+\.?\d*\b/g, type: 'number' },
  ] : [
    { regex: /\/\/.*$/gm, type: 'comment' },
    { regex: /\/\*[\s\S]*?\*\//g, type: 'comment' },
    { regex: /'[^']*'|"[^"]*"|`[^`]*`/g, type: 'string' },
    { regex: /\b(const|let|var|function|class|return|if|else|for|while|new|this|throw|try|catch|import|export|default|from|extends|constructor|static|get|set|async|await)\b/g, type: 'keyword' },
    { regex: /\b(true|false|null|undefined|NaN|Infinity)\b/g, type: 'constant' },
    { regex: /\b\d+\.?\d*\b/g, type: 'number' },
  ]

  // Tokenize: find all matches with their positions
  const allMatches = []
  patterns.forEach(({ regex, type }) => {
    const re = new RegExp(regex.source, regex.flags)
    while ((match = re.exec(code)) !== null) {
      allMatches.push({ start: match.index, end: match.index + match[0].length, text: match[0], type })
    }
  })

  // Sort by position and remove overlapping matches (earlier ones win)
  allMatches.sort((a, b) => a.start - b.start)
  const filtered = []
  let lastEnd = 0
  for (const m of allMatches) {
    if (m.start >= lastEnd) {
      filtered.push(m)
      lastEnd = m.end
    }
  }

  // Build result
  let result = ''
  let pos = 0
  for (const m of filtered) {
    if (m.start > pos) {
      result += escapeHtml(code.slice(pos, m.start))
    }
    result += `<span class="token-${m.type}">${escapeHtml(m.text)}</span>`
    pos = m.end
  }
  if (pos < code.length) {
    result += escapeHtml(code.slice(pos))
  }

  return result
}

function CodeBlock({ code, language = 'javascript', title, showLineNumbers = true }) {
  const [copied, setCopied] = useState(false)
  const lines = code.trim().split('\n')

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code.trim())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="code-block">
      <div className="code-block__header">
        <div className="code-block__dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <span className="code-block__title">{title || `${language}`}</span>
        <button
          className={`code-block__copy ${copied ? 'code-block__copy--copied' : ''}`}
          onClick={handleCopy}
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Copied</span>
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="code-block__body">
        {showLineNumbers && (
          <div className="code-block__line-numbers" aria-hidden="true">
            {lines.map((_, i) => (
              <span key={i}>{i + 1}</span>
            ))}
          </div>
        )}
        <pre className="code-block__pre">
          <code
            className="code-block__code"
            dangerouslySetInnerHTML={{ __html: highlightCode(code.trim(), language) }}
          />
        </pre>
      </div>
    </div>
  )
}

export default CodeBlock
