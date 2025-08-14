import { Menu, X } from 'lucide-react'
import React, { useState } from 'react'

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { label: 'Funcionalidades', href: '#features' },
    { label: 'Gamificação', href: '#gamificacao' },
    { label: 'Gestão', href: '#kanban' },
    { label: 'FAQ', href: '#faq' }
  ]

  const handleLinkClick = (href: string) => {
    setIsMenuOpen(false)
    // Scroll to element with offset for fixed header
    setTimeout(() => {
      const element = document.querySelector(href)
      if (element) {
        const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80
        window.scrollTo({ top: offsetTop, behavior: 'smooth' })
      }
    }, 100)
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-black">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <a
              href="#"
              className="focus-brut rounded"
              aria-label="Página inicial MenuXP"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              <div className="flex items-center justify-center">
                <img
                  src="public/images/menuxp-logo.svg"
                  alt="Seu restaurante merece um app próprio."
                  className="w-28 h-auto"
                />
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleLinkClick(link.href)
                }}
                className="font-body text-gray-700 hover:text-black hover:opacity-80 transition-opacity focus-brut rounded px-2 py-1"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTAs
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="#contato"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#contato');
              }}
              className="btn-brut white"
            >
              Falar com o time
            </a>
            <a
              href="#demo"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#demo');
              }}
              className="btn-brut"
            >
              Quero uma demo
            </a>
          </div> */}

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 focus-brut rounded"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-black">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleLinkClick(link.href)
                  }}
                  className="block px-3 py-2 font-body text-gray-700 hover:text-black hover:bg-gray-50 focus-brut rounded"
                >
                  {link.label}
                </a>
              ))}
              {/*  <div className="flex flex-col space-y-2 px-3 pt-4">
                <a
                  href="#contato"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick('#contato');
                  }}
                  className="btn-brut white text-center"
                >
                  Falar com o time
                </a>
                <a
                  href="#demo"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick('#demo');
                  }}
                  className="btn-brut text-center"
                >
                  Quero uma demo
                </a>
              </div> */}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default NavBar
