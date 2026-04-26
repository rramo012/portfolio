'use client'

import { useEffect, useState, useCallback } from 'react'

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === '#') return
    const target = document.querySelector(href)
    if (target) {
      e.preventDefault()
      const top = target.getBoundingClientRect().top + window.pageYOffset - 60
      window.scrollTo({ top, behavior: 'smooth' })
    }
    setMenuOpen(false)
    document.body.style.overflow = ''
  }, [])

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => {
      document.body.style.overflow = !prev ? 'hidden' : ''
      return !prev
    })
  }, [])

  return (
    <>
      <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
        <a href="#" className="nav__logo">
          R<span>.</span>R
        </a>
        <ul className="nav__links">
          {links.map(({ href, label }) => (
            <li key={href}>
              <a href={href} className="nav__link" onClick={(e) => scrollTo(e, href)}>
                {label}
              </a>
            </li>
          ))}
        </ul>
        <button
          className={`nav__burger${menuOpen ? ' nav__burger--active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`mobile-menu${menuOpen ? ' mobile-menu--active' : ''}`}>
        {links.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            className="mobile-menu__link"
            onClick={(e) => scrollTo(e, href)}
          >
            {label}
          </a>
        ))}
      </div>
    </>
  )
}
