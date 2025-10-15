import React from 'react'

import * as S from './styles'

const Footer: React.FC = () => {
  const handleScrollTo = (target: string) => {
    const element = document.querySelector(target)
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80
      window.scrollTo({ top: offsetTop, behavior: 'smooth' })
    }
  }

  const platformLinks = [
    { label: 'Funcionalidades', href: '#features' },
    { label: 'Mini-jogos', href: '#minigames' },
    { label: 'Gestão Completa', href: '#kanban' }
  ]

  const contactLinks = [
    { label: 'Solicitar Demo', href: '#demo' },
    { label: 'Contato', href: '#contato' }
  ]

  return (
    <S.Footer id="contato">
      <S.FooterContainer>
        <S.FooterGrid>
          <S.BrandColumn>
            <S.LogoContainer>
              <S.Logo src="/images/menuxp-logo.svg" alt="Seu restaurante merece um app próprio." />
            </S.LogoContainer>
            <S.BrandDescription>
              A plataforma completa para restaurantes que querem controle total das vendas: sem taxas, com IA e
              gamificação para crescer de verdade.
            </S.BrandDescription>
          </S.BrandColumn>
          <S.LinksColumn>
            <S.LinksTitle>Plataforma</S.LinksTitle>
            <S.LinksList>
              {platformLinks.map((link) => (
                <S.LinksItem key={link.href}>
                  <S.Link
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleScrollTo(link.href)
                    }}
                  >
                    {link.label}
                  </S.Link>
                </S.LinksItem>
              ))}
            </S.LinksList>
          </S.LinksColumn>
          <S.LinksColumn>
            <S.LinksTitle>Contato</S.LinksTitle>
            <S.LinksList>
              {contactLinks.map((link) => (
                <S.LinksItem key={link.href}>
                  <S.Link
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleScrollTo(link.href)
                    }}
                  >
                    {link.label}
                  </S.Link>
                </S.LinksItem>
              ))}
            </S.LinksList>
          </S.LinksColumn>
        </S.FooterGrid>
        <S.FooterDivider />
        <S.FooterBottom>
          <S.Copyright>© 2025 MenuXP. Todos os direitos reservados.</S.Copyright>
          <S.DeveloperInfo>
            <S.DeveloperText>Desenvolvido por</S.DeveloperText>
            <S.DeveloperLink
              href="https://gameficare.studio"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Gameficare Studio"
            >
              <S.DeveloperLogo src="/images/menuxp-logo.svg" alt="Gameficare Studio" />
            </S.DeveloperLink>
          </S.DeveloperInfo>
        </S.FooterBottom>
      </S.FooterContainer>
    </S.Footer>
  )
}

export default Footer
