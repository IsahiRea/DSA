import { Link } from 'react-router-dom'
import './Topics.css'

const topics = [
  {
    category: 'Data Structures',
    description: 'Fundamental ways to organize and store data',
    items: [
      {
        name: 'Arrays',
        path: '/topics/arrays',
        description: 'Contiguous memory storage',
        complexity: 'O(1) access',
        icon: '[ ]'
      },
      {
        name: 'Linked Lists',
        path: '/topics/linked-lists',
        description: 'Node-based sequential data',
        complexity: 'O(n) access',
        icon: '→'
      },
      {
        name: 'Stacks',
        path: '/topics/stacks',
        description: 'LIFO data structure',
        complexity: 'O(1) push/pop',
        icon: '▤'
      },
      {
        name: 'Queues',
        path: '/topics/queues',
        description: 'FIFO data structure',
        complexity: 'O(1) enqueue',
        icon: '▥'
      },
      {
        name: 'Trees',
        path: '/topics/trees',
        description: 'Hierarchical data structure',
        complexity: 'O(log n) search',
        icon: '⌃'
      },
      {
        name: 'Graphs',
        path: '/topics/graphs',
        description: 'Network of connected nodes',
        complexity: 'O(V+E) traversal',
        icon: '◈'
      },
    ]
  },
  {
    category: 'Algorithms',
    description: 'Techniques for solving computational problems',
    items: [
      {
        name: 'Sorting',
        path: '/topics/sorting',
        description: 'Ordering elements efficiently',
        complexity: 'O(n log n)',
        icon: '↕'
      },
      {
        name: 'Searching',
        path: '/topics/searching',
        description: 'Finding elements in data',
        complexity: 'O(log n)',
        icon: '⌕'
      },
      {
        name: 'Recursion',
        path: '/topics/recursion',
        description: 'Self-referential solutions',
        complexity: 'Varies',
        icon: '∞'
      },
      {
        name: 'Dynamic Programming',
        path: '/topics/dynamic-programming',
        description: 'Optimal substructure problems',
        complexity: 'Polynomial',
        icon: '◫'
      },
    ]
  }
]

function Topics() {
  return (
    <div className="topics">
      <header className="topics__header">
        <div className="topics__label">
          <span className="topics__label-line"></span>
          <span>// EXPLORE</span>
        </div>
        <h1 className="topics__title">DSA Topics</h1>
        <p className="topics__intro">
          Select a topic to explore in-depth explanations, code implementations,
          and interactive visualizations.
        </p>
      </header>

      <div className="topics__content">
        {topics.map((section, sectionIndex) => (
          <section key={section.category} className="topic-section">
            <div className="topic-section__header">
              <div className="topic-section__index">
                {String(sectionIndex + 1).padStart(2, '0')}
              </div>
              <div className="topic-section__info">
                <h2 className="topic-section__title">{section.category}</h2>
                <p className="topic-section__description">{section.description}</p>
              </div>
            </div>

            <div className="topic-grid">
              {section.items.map((topic, topicIndex) => (
                <Link
                  key={topic.path}
                  to={topic.path}
                  className="topic-card"
                  style={{ '--delay': `${topicIndex * 0.05}s` }}
                >
                  <div className="topic-card__header">
                    <span className="topic-card__icon">{topic.icon}</span>
                    <span className="topic-card__complexity">{topic.complexity}</span>
                  </div>
                  <div className="topic-card__body">
                    <h3 className="topic-card__name">{topic.name}</h3>
                    <p className="topic-card__description">{topic.description}</p>
                  </div>
                  <div className="topic-card__footer">
                    <span className="topic-card__link">
                      Explore
                      <span className="topic-card__arrow">→</span>
                    </span>
                  </div>
                  <div className="topic-card__glow"></div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

export default Topics
