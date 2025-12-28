import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './NotFound.css'

function NotFound() {
  const location = useLocation()
  const [searchStep, setSearchStep] = useState(0)
  const [glitchActive, setGlitchActive] = useState(false)

  // Simulate a search algorithm failing
  useEffect(() => {
    const interval = setInterval(() => {
      setSearchStep((prev) => (prev + 1) % 8)
    }, 600)

    return () => clearInterval(interval)
  }, [])

  // Periodic glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 200)
    }, 3000)

    return () => clearInterval(glitchInterval)
  }, [])

  const nodes = [
    { id: 0, label: '/' },
    { id: 1, label: '/topics' },
    { id: 2, label: '/about' },
    { id: 3, label: '???' },
    { id: 4, label: '/docs' },
    { id: 5, label: '/api' },
    { id: 6, label: 'null' },
    { id: 7, label: '404' },
  ]

  return (
    <div className="not-found">
      <div className="not-found__bg">
        <div className="not-found__grid"></div>
        <div className="not-found__noise"></div>
      </div>

      <div className="not-found__content">
        <div className="not-found__terminal">
          <div className="not-found__terminal-header">
            <div className="not-found__dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span className="not-found__terminal-title">search_path.exe</span>
          </div>

          <div className="not-found__terminal-body">
            <div className="not-found__output">
              <span className="not-found__prompt">$</span>
              <span className="not-found__command">find "{location.pathname}"</span>
            </div>
            <div className="not-found__output not-found__output--error">
              <span className="not-found__prompt">!</span>
              <span>ERROR: Path not found in tree</span>
            </div>
            <div className="not-found__output">
              <span className="not-found__prompt">&gt;</span>
              <span>Traversing nodes<span className="not-found__ellipsis"></span></span>
            </div>
          </div>
        </div>

        <div className={`not-found__code ${glitchActive ? 'not-found__code--glitch' : ''}`}>
          <span className="not-found__code-4">4</span>
          <span className="not-found__code-0">0</span>
          <span className="not-found__code-4">4</span>
        </div>

        <div className="not-found__search-viz">
          <div className="not-found__nodes">
            {nodes.map((node, index) => (
              <div
                key={node.id}
                className={`not-found__node ${
                  searchStep === index ? 'not-found__node--active' : ''
                } ${searchStep > index ? 'not-found__node--visited' : ''}`}
              >
                <span className="not-found__node-label">{node.label}</span>
              </div>
            ))}
          </div>
          <div className="not-found__search-status">
            <span className="not-found__status-dot"></span>
            <span>Binary search: target not in array</span>
          </div>
        </div>

        <div className="not-found__message">
          <h1 className="not-found__title">Node Not Found</h1>
          <p className="not-found__description">
            The path <code>{location.pathname}</code> doesn't exist in our data structure.
            The search algorithm has exhausted all possibilities.
          </p>
        </div>

        <div className="not-found__actions">
          <Link to="/" className="not-found__cta">
            <span className="not-found__cta-icon">{'<'}</span>
            <span>Return to Root</span>
          </Link>
          <Link to="/topics" className="not-found__secondary">
            Browse Topics
          </Link>
        </div>

        <div className="not-found__stack-trace">
          <div className="not-found__trace-header">// Stack Trace</div>
          <div className="not-found__trace-line">
            <span className="not-found__trace-num">01</span>
            <span>at Router.findRoute()</span>
          </div>
          <div className="not-found__trace-line">
            <span className="not-found__trace-num">02</span>
            <span>at BinarySearch.lookup()</span>
          </div>
          <div className="not-found__trace-line">
            <span className="not-found__trace-num">03</span>
            <span>at HashTable.get() → undefined</span>
          </div>
          <div className="not-found__trace-line not-found__trace-line--highlight">
            <span className="not-found__trace-num">04</span>
            <span>throw new PageNotFoundError()</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
