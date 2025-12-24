import { Link } from 'react-router-dom'
import './About.css'

const skills = [
  { name: 'Problem Solving', level: 90 },
  { name: 'Algorithm Design', level: 85 },
  { name: 'Data Structures', level: 88 },
  { name: 'Code Optimization', level: 82 },
]

const technologies = [
  { name: 'React', category: 'Frontend' },
  { name: 'JavaScript', category: 'Language' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Python', category: 'Language' },
  { name: 'Git', category: 'Tools' },
]

function About() {
  return (
    <div className="about">
      {/* Header */}
      <header className="about__header">
        <div className="about__label">
          <span className="about__label-line"></span>
          <span>// ABOUT</span>
        </div>
        <h1 className="about__title">
          Building Understanding
          <br />
          <span className="about__title--accent">Through Code</span>
        </h1>
      </header>

      {/* Mission */}
      <section className="about__mission">
        <div className="about__mission-content">
          <p className="about__mission-text">
            This portfolio is a journey through the fundamental concepts that
            power modern software. Each topic is explored with interactive
            visualizations, clear explanations, and practical code examples.
          </p>
          <div className="about__mission-stats">
            <div className="about__stat">
              <span className="about__stat-value">10+</span>
              <span className="about__stat-label">Topics Covered</span>
            </div>
            <div className="about__stat">
              <span className="about__stat-value">100%</span>
              <span className="about__stat-label">Interactive</span>
            </div>
          </div>
        </div>
        <div className="about__mission-decoration">
          <div className="about__code-block">
            <span className="code-comment">// The journey begins here</span>
            <br />
            <span className="code-keyword">const</span> knowledge ={' '}
            <span className="code-function">learn</span>(dsa);
          </div>
        </div>
      </section>

      {/* Topics Grid */}
      <section className="about__section">
        <div className="about__section-header">
          <span className="about__section-index">01</span>
          <h2 className="about__section-title">Topics Covered</h2>
        </div>
        <div className="about__topics-grid">
          <div className="about__topic-category">
            <h3>Data Structures</h3>
            <ul>
              <li>Arrays & Dynamic Arrays</li>
              <li>Linked Lists (Singly, Doubly, Circular)</li>
              <li>Stacks & Queues</li>
              <li>Trees (Binary, BST, AVL, Red-Black)</li>
              <li>Graphs (Directed, Undirected, Weighted)</li>
              <li>Hash Tables</li>
              <li>Heaps & Priority Queues</li>
            </ul>
          </div>
          <div className="about__topic-category">
            <h3>Algorithms</h3>
            <ul>
              <li>Sorting (Bubble, Merge, Quick, Heap)</li>
              <li>Searching (Binary, Linear, DFS, BFS)</li>
              <li>Recursion & Backtracking</li>
              <li>Dynamic Programming</li>
              <li>Greedy Algorithms</li>
              <li>Graph Algorithms</li>
              <li>String Algorithms</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="about__section">
        <div className="about__section-header">
          <span className="about__section-index">02</span>
          <h2 className="about__section-title">Core Competencies</h2>
        </div>
        <div className="about__skills">
          {skills.map((skill) => (
            <div key={skill.name} className="about__skill">
              <div className="about__skill-header">
                <span className="about__skill-name">{skill.name}</span>
                <span className="about__skill-level">{skill.level}%</span>
              </div>
              <div className="about__skill-bar">
                <div
                  className="about__skill-progress"
                  style={{ '--progress': `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technologies */}
      <section className="about__section">
        <div className="about__section-header">
          <span className="about__section-index">03</span>
          <h2 className="about__section-title">Technologies</h2>
        </div>
        <div className="about__technologies">
          {technologies.map((tech) => (
            <div key={tech.name} className="about__tech">
              <span className="about__tech-name">{tech.name}</span>
              <span className="about__tech-category">{tech.category}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="about__cta">
        <div className="about__cta-content">
          <h2>Ready to Explore?</h2>
          <p>Dive into the topics and start your DSA journey.</p>
          <Link to="/topics" className="about__cta-button">
            <span>View All Topics</span>
            <span className="about__cta-arrow">→</span>
          </Link>
        </div>
        <div className="about__cta-decoration"></div>
      </section>
    </div>
  )
}

export default About
