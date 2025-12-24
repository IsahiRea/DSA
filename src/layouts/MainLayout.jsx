import { Outlet, NavLink } from 'react-router-dom'
import './MainLayout.css'

function MainLayout() {
  return (
    <div className="layout">
      <header className="header">
        <nav className="nav">
          <NavLink to="/" className="nav-brand">DSA Portfolio</NavLink>
          <ul className="nav-links">
            <li><NavLink to="/" end>Home</NavLink></li>
            <li><NavLink to="/topics">Topics</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
          </ul>
        </nav>
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">
        <p>DSA Concepts Portfolio</p>
      </footer>
    </div>
  )
}

export default MainLayout
