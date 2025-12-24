import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <h1>Data Structures & Algorithms</h1>
        <p>
          Exploring fundamental computer science concepts through interactive
          examples and visualizations.
        </p>
        <Link to="/topics" className="cta-button">
          Explore Topics
        </Link>
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>Data Structures</h3>
          <p>Arrays, Linked Lists, Trees, Graphs, and more.</p>
        </div>
        <div className="feature-card">
          <h3>Algorithms</h3>
          <p>Sorting, Searching, Dynamic Programming, and more.</p>
        </div>
        <div className="feature-card">
          <h3>Visualizations</h3>
          <p>Interactive demonstrations of how these concepts work.</p>
        </div>
      </section>
    </div>
  )
}

export default Home
