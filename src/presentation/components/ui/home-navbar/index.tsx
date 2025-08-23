import React from 'react'

import * as S from './styles'

const NavBar: React.FC = () => {
  const navLinks = [
    { label: 'Funcionalidades', href: '#features' },
    { label: 'Gamificação', href: '#gamificacao' },
    { label: 'Gestão', href: '#kanban' },
    { label: 'FAQ', href: '#faq' }
  ]

  const handleLinkClick = (href: string) => {
    setTimeout(() => {
      const element = document.querySelector(href)
      if (element) {
        const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80
        window.scrollTo({ top: offsetTop, behavior: 'smooth' })
      }
    }, 100)
  }

  return (
    <S.DesktopNav>
      {navLinks.map((link) => (
        <S.NavLink
          key={link.href}
          href={link.href}
          onClick={(e) => {
            e.preventDefault()
            handleLinkClick(link.href)
          }}
        >
          {link.label}
        </S.NavLink>
      ))}
    </S.DesktopNav>
  )
}

export default NavBar
