import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './MainLayout.css'

function MainLayout() {
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="layout">
      <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
        <nav className="nav">
          <NavLink to="/" className="nav-brand">
            <span className="nav-brand__symbol">&gt;_</span>
            <span className="nav-brand__text">DSA</span>
          </NavLink>

          <div className="nav-links">
            <NavLink to="/" end className="nav-link">
              <span className="nav-link__index">01</span>
              <span className="nav-link__text">Home</span>
            </NavLink>
            <NavLink to="/topics" className="nav-link">
              <span className="nav-link__index">02</span>
              <span className="nav-link__text">Topics</span>
            </NavLink>
            <NavLink to="/about" className="nav-link">
              <span className="nav-link__index">03</span>
              <span className="nav-link__text">About</span>
            </NavLink>
          </div>

          <div className="nav-status">
            <span className="nav-status__dot"></span>
            <span className="nav-status__text">ONLINE</span>
          </div>
        </nav>
      </header>

      <main className="main" key={location.pathname}>
        <Outlet />
      </main>

      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__left">
            <span className="footer__symbol">&lt;/&gt;</span>
            <span>DSA Portfolio</span>
          </div>
          <div className="footer__right">
            <span className="footer__status">
              <span className="footer__dot"></span>
              System Active
            </span>
          </div>
        </div>
        <div className="footer__decoration"></div>
      </footer>
    </div>
  )
}

export default MainLayout
