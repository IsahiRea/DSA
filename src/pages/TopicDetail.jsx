import { useParams, Link, Navigate } from 'react-router-dom'
import { useState } from 'react'
import { getTopic } from '../data/topics'
import LanguageTabs from '../components/TopicDetail/LanguageTabs'
import ArrayVisualization from '../components/visualizations/ArrayVisualization'
import LinkedListVisualization from '../components/visualizations/LinkedListVisualization'
import './TopicDetail.css'

const VISUALIZATIONS = {
  'arrays': ArrayVisualization,
  'linked-lists': LinkedListVisualization,
}

function TopicDetail() {
  const { slug } = useParams()
  const topic = getTopic(slug)
  const [expandedOperation, setExpandedOperation] = useState(null)

  if (!topic) {
    return <Navigate to="/404" replace />
  }

  const { meta, overview, operations, codeExamples, useCases, commonMistakes, relatedTopics } = topic

  const toggleOperation = (index) => {
    setExpandedOperation(expandedOperation === index ? null : index)
  }

  return (
    <div className="topic-detail">
      {/* Breadcrumb */}
      <nav className="topic-detail__breadcrumb">
        <Link to="/topics" className="topic-detail__breadcrumb-link">Topics</Link>
        <span className="topic-detail__breadcrumb-sep">/</span>
        <span className="topic-detail__breadcrumb-current">{meta.name}</span>
      </nav>

      {/* Header */}
      <header className="topic-detail__header">
        <div className="topic-detail__header-top">
          <div className="topic-detail__category">{meta.category}</div>
          <div className="topic-detail__complexity-badges">
            <span className="topic-detail__badge topic-detail__badge--time">
              <span className="topic-detail__badge-label">Time</span>
              <span className="topic-detail__badge-value">{meta.complexity.time}</span>
            </span>
            <span className="topic-detail__badge topic-detail__badge--space">
              <span className="topic-detail__badge-label">Space</span>
              <span className="topic-detail__badge-value">{meta.complexity.space}</span>
            </span>
          </div>
        </div>

        <div className="topic-detail__title-row">
          <span className="topic-detail__icon">{meta.icon}</span>
          <h1 className="topic-detail__title">{meta.name}</h1>
        </div>

        <p className="topic-detail__description">{meta.description}</p>
      </header>

      {/* Overview Section */}
      <section className="topic-detail__section">
        <div className="topic-detail__section-header">
          <span className="topic-detail__section-number">01</span>
          <h2 className="topic-detail__section-title">Overview</h2>
        </div>

        <div className="topic-detail__overview">
          <div className="topic-detail__overview-block">
            <h3 className="topic-detail__overview-label">What is it?</h3>
            <p className="topic-detail__overview-text">{overview.what}</p>
          </div>

          <div className="topic-detail__overview-block">
            <h3 className="topic-detail__overview-label">Why use it?</h3>
            <p className="topic-detail__overview-text">{overview.why}</p>
          </div>

          <div className="topic-detail__overview-block">
            <h3 className="topic-detail__overview-label">Real-World Applications</h3>
            <ul className="topic-detail__real-world-list">
              {overview.realWorld.map((item, index) => (
                <li key={index} className="topic-detail__real-world-item">
                  <span className="topic-detail__real-world-bullet">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Visualization Section */}
      <section className="topic-detail__section">
        <div className="topic-detail__section-header">
          <span className="topic-detail__section-number">02</span>
          <h2 className="topic-detail__section-title">Visualization</h2>
        </div>

        {VISUALIZATIONS[slug] ? (
          (() => {
            const VisualizationComponent = VISUALIZATIONS[slug]
            return <VisualizationComponent />
          })()
        ) : (
          <div className="topic-detail__no-viz">
            Visualization coming soon for {meta.name}
          </div>
        )}
      </section>

      {/* Operations Section */}
      <section className="topic-detail__section">
        <div className="topic-detail__section-header">
          <span className="topic-detail__section-number">03</span>
          <h2 className="topic-detail__section-title">Operations</h2>
        </div>

        <div className="topic-detail__operations">
          {/* Complexity Table */}
          <div className="topic-detail__complexity-table">
            <div className="topic-detail__table-header">
              <span>Operation</span>
              <span>Time</span>
              <span>Space</span>
            </div>
            {operations.map((op, index) => (
              <div key={index} className="topic-detail__table-row">
                <span className="topic-detail__op-name">{op.name}</span>
                <span className="topic-detail__op-time">{op.timeComplexity}</span>
                <span className="topic-detail__op-space">{op.spaceComplexity}</span>
              </div>
            ))}
          </div>

          {/* Operation Details */}
          <div className="topic-detail__op-cards">
            {operations.map((op, index) => (
              <div
                key={index}
                className={`topic-detail__op-card ${expandedOperation === index ? 'topic-detail__op-card--expanded' : ''}`}
              >
                <button
                  className="topic-detail__op-card-header"
                  onClick={() => toggleOperation(index)}
                  aria-expanded={expandedOperation === index}
                >
                  <div className="topic-detail__op-card-info">
                    <span className="topic-detail__op-card-name">{op.name}</span>
                    <span className="topic-detail__op-card-complexity">{op.timeComplexity}</span>
                  </div>
                  <span className="topic-detail__op-card-toggle">
                    {expandedOperation === index ? '−' : '+'}
                  </span>
                </button>

                <div className="topic-detail__op-card-body">
                  <p className="topic-detail__op-card-desc">{op.description}</p>
                  <LanguageTabs code={op.code} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Implementation Section */}
      <section className="topic-detail__section">
        <div className="topic-detail__section-header">
          <span className="topic-detail__section-number">04</span>
          <h2 className="topic-detail__section-title">Implementation</h2>
        </div>

        <div className="topic-detail__implementation">
          <p className="topic-detail__impl-intro">
            Complete implementation with all standard operations. This class-based approach
            demonstrates dynamic array resizing and bounds checking.
          </p>
          <LanguageTabs code={codeExamples} />
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="topic-detail__section">
        <div className="topic-detail__section-header">
          <span className="topic-detail__section-number">05</span>
          <h2 className="topic-detail__section-title">Use Cases</h2>
        </div>

        <div className="topic-detail__use-cases">
          {useCases.map((useCase, index) => (
            <div key={index} className="topic-detail__use-case">
              <div className="topic-detail__use-case-index">{String(index + 1).padStart(2, '0')}</div>
              <div className="topic-detail__use-case-content">
                <h3 className="topic-detail__use-case-title">{useCase.title}</h3>
                <p className="topic-detail__use-case-desc">{useCase.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Common Mistakes Section */}
      <section className="topic-detail__section">
        <div className="topic-detail__section-header">
          <span className="topic-detail__section-number">06</span>
          <h2 className="topic-detail__section-title">Common Mistakes</h2>
        </div>

        <div className="topic-detail__mistakes">
          {commonMistakes.map((item, index) => (
            <div key={index} className="topic-detail__mistake">
              <div className="topic-detail__mistake-bad">
                <span className="topic-detail__mistake-icon">✗</span>
                <span>{item.mistake}</span>
              </div>
              <div className="topic-detail__mistake-good">
                <span className="topic-detail__mistake-icon">✓</span>
                <span>{item.correction}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Related Topics Section */}
      <section className="topic-detail__section">
        <div className="topic-detail__section-header">
          <span className="topic-detail__section-number">07</span>
          <h2 className="topic-detail__section-title">Related Topics</h2>
        </div>

        <div className="topic-detail__related">
          {relatedTopics.map((slug) => (
            <Link
              key={slug}
              to={`/topics/${slug}`}
              className="topic-detail__related-link"
            >
              <span className="topic-detail__related-arrow">→</span>
              <span>{slug.replace(/-/g, ' ')}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Navigation Footer */}
      <footer className="topic-detail__footer">
        <Link to="/topics" className="topic-detail__back-link">
          <span>←</span>
          <span>Back to Topics</span>
        </Link>
      </footer>
    </div>
  )
}

export default TopicDetail
