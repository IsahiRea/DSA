import { Link } from 'react-router-dom'
import './Topics.css'

const topics = [
  {
    category: 'Data Structures',
    items: [
      { name: 'Arrays', path: '/topics/arrays', description: 'Contiguous memory storage' },
      { name: 'Linked Lists', path: '/topics/linked-lists', description: 'Node-based sequential data' },
      { name: 'Stacks', path: '/topics/stacks', description: 'LIFO data structure' },
      { name: 'Queues', path: '/topics/queues', description: 'FIFO data structure' },
      { name: 'Trees', path: '/topics/trees', description: 'Hierarchical data structure' },
      { name: 'Graphs', path: '/topics/graphs', description: 'Network of connected nodes' },
    ]
  },
  {
    category: 'Algorithms',
    items: [
      { name: 'Sorting', path: '/topics/sorting', description: 'Ordering elements' },
      { name: 'Searching', path: '/topics/searching', description: 'Finding elements' },
      { name: 'Recursion', path: '/topics/recursion', description: 'Self-referential solutions' },
      { name: 'Dynamic Programming', path: '/topics/dynamic-programming', description: 'Optimal substructure' },
    ]
  }
]

function Topics() {
  return (
    <div className="topics">
      <h1>DSA Topics</h1>
      <p className="topics-intro">
        Select a topic to learn more about the concept and see interactive examples.
      </p>

      {topics.map((section) => (
        <section key={section.category} className="topic-section">
          <h2>{section.category}</h2>
          <div className="topic-grid">
            {section.items.map((topic) => (
              <Link key={topic.path} to={topic.path} className="topic-card">
                <h3>{topic.name}</h3>
                <p>{topic.description}</p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

export default Topics
