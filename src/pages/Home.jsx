import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero__badge">
          <span className="hero__badge-dot"></span>
          <span>Exploring Computational Thinking</span>
        </div>

        <h1 className="hero__title">
          <span className="hero__title-line">Data Structures</span>
          <span className="hero__title-line hero__title-line--accent">&amp; Algorithms</span>
        </h1>

        <p className="hero__description">
          A deep dive into the fundamental building blocks of computer science.
          Interactive visualizations, code implementations, and comprehensive explanations.
        </p>

        <div className="hero__actions">
          <Link to="/topics" className="hero__cta">
            <span className="hero__cta-text">Explore Topics</span>
            <span className="hero__cta-arrow">→</span>
          </Link>
          <Link to="/about" className="hero__secondary">
            Learn More
          </Link>
        </div>

        <div className="hero__decoration">
          <div className="hero__grid"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="stat">
          <span className="stat__number">10+</span>
          <span className="stat__label">Data Structures</span>
        </div>
        <div className="stat">
          <span className="stat__number">15+</span>
          <span className="stat__label">Algorithms</span>
        </div>
        <div className="stat">
          <span className="stat__number">∞</span>
          <span className="stat__label">Possibilities</span>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features__header">
          <span className="features__label">// WHAT YOU'LL FIND</span>
          <h2 className="features__title">Core Concepts</h2>
        </div>

        <div className="features__grid">
          <article className="feature">
            <div className="feature__icon">
              <span>{'{ }'}</span>
            </div>
            <div className="feature__content">
              <h3 className="feature__title">Data Structures</h3>
              <p className="feature__description">
                Arrays, Linked Lists, Trees, Graphs, Hash Tables, and more.
                Learn how data is organized and stored efficiently.
              </p>
            </div>
            <div className="feature__index">01</div>
          </article>

          <article className="feature">
            <div className="feature__icon">
              <span>{'<>'}</span>
            </div>
            <div className="feature__content">
              <h3 className="feature__title">Algorithms</h3>
              <p className="feature__description">
                Sorting, Searching, Graph Traversal, Dynamic Programming.
                Master the techniques that power modern software.
              </p>
            </div>
            <div className="feature__index">02</div>
          </article>

          <article className="feature">
            <div className="feature__icon">
              <span>{'[▶]'}</span>
            </div>
            <div className="feature__content">
              <h3 className="feature__title">Visualizations</h3>
              <p className="feature__description">
                See algorithms in action with interactive step-by-step
                visualizations that make complex concepts intuitive.
              </p>
            </div>
            <div className="feature__index">03</div>
          </article>
        </div>
      </section>

      {/* Code Preview Section */}
      <section className="preview">
        <div className="preview__terminal">
          <div className="preview__header">
            <div className="preview__dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span className="preview__title">algorithm.js</span>
          </div>
          <pre className="preview__code">
            <code>
              <span className="code-keyword">function</span>{' '}
              <span className="code-function">binarySearch</span>
              <span className="code-bracket">(</span>arr, target
              <span className="code-bracket">)</span>{' '}
              <span className="code-bracket">{'{'}</span>
              {'\n'}
              {'  '}
              <span className="code-keyword">let</span> left ={' '}
              <span className="code-number">0</span>;{'\n'}
              {'  '}
              <span className="code-keyword">let</span> right = arr.length -{' '}
              <span className="code-number">1</span>;{'\n'}
              {'\n'}
              {'  '}
              <span className="code-keyword">while</span>{' '}
              <span className="code-bracket">(</span>left {'<='} right
              <span className="code-bracket">)</span>{' '}
              <span className="code-bracket">{'{'}</span>
              {'\n'}
              {'    '}
              <span className="code-keyword">const</span> mid ={' '}
              <span className="code-function">Math.floor</span>
              <span className="code-bracket">(</span>
              <span className="code-bracket">(</span>left + right
              <span className="code-bracket">)</span> /{' '}
              <span className="code-number">2</span>
              <span className="code-bracket">)</span>;{'\n'}
              {'    '}
              <span className="code-keyword">if</span>{' '}
              <span className="code-bracket">(</span>arr[mid] === target
              <span className="code-bracket">)</span>{' '}
              <span className="code-keyword">return</span> mid;{'\n'}
              {'    '}
              <span className="code-keyword">if</span>{' '}
              <span className="code-bracket">(</span>arr[mid] {'<'} target
              <span className="code-bracket">)</span> left = mid +{' '}
              <span className="code-number">1</span>;{'\n'}
              {'    '}
              <span className="code-keyword">else</span> right = mid -{' '}
              <span className="code-number">1</span>;{'\n'}
              {'  '}
              <span className="code-bracket">{'}'}</span>
              {'\n'}
              {'  '}
              <span className="code-keyword">return</span> -
              <span className="code-number">1</span>;{'\n'}
              <span className="code-bracket">{'}'}</span>
            </code>
          </pre>
          <div className="preview__cursor"></div>
        </div>
      </section>
    </div>
  )
}

export default Home
