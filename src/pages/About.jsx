import './About.css'

function About() {
  return (
    <div className="about">
      <h1>About This Project</h1>

      <section className="about-section">
        <h2>Purpose</h2>
        <p>
          This portfolio demonstrates my understanding of Data Structures and
          Algorithms through interactive examples and visualizations. Each topic
          includes explanations, code implementations, and visual demonstrations.
        </p>
      </section>

      <section className="about-section">
        <h2>Topics Covered</h2>
        <ul>
          <li>Fundamental data structures (Arrays, Linked Lists, Stacks, Queues)</li>
          <li>Advanced data structures (Trees, Graphs, Hash Tables)</li>
          <li>Sorting algorithms (Bubble, Merge, Quick, Heap)</li>
          <li>Searching algorithms (Binary Search, BFS, DFS)</li>
          <li>Problem-solving techniques (Recursion, Dynamic Programming)</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>Technologies</h2>
        <ul>
          <li>React for building the UI</li>
          <li>React Router for navigation</li>
          <li>CSS for styling with mobile-first approach</li>
        </ul>
      </section>
    </div>
  )
}

export default About
