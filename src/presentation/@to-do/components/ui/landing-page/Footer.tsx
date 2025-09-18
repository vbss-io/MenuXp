import React from 'react'

// To-Do: Refatorar styles and remove tailwind
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
    { label: 'Contato', href: '#demo' }
  ]

  return (
    <footer id="contato" className="bg-black text-white py-16 w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center">
                <img
                  src="public/images/menuxp-logo.svg"
                  alt="Seu restaurante merece um app próprio."
                  className="w-28 h-auto"
                />
              </div>
            </div>
            <p className="font-body text-gray-300 max-w-md">
              A plataforma completa para restaurantes que querem controle total das vendas: sem taxas, com IA e
              gamificação para crescer de verdade.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-title text-lg font-regular mb-4">Plataforma</h4>
            <ul className="space-y-2">
              {platformLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleScrollTo(link.href)
                    }}
                    className="font-body text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Links */}
          <div>
            <h4 className="font-title text-lg font-regular mb-4">Contato</h4>
            <ul className="space-y-2">
              {contactLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleScrollTo(link.href)
                    }}
                    className="font-body text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white-800 mt-8">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400 text-sm font-montserrat text-center md:text-left">
                © 2025 MenuXP. Todos os direitos reservados.
              </div>

              <div className="flex items-center space-x-3 text-gray-400 text-sm font-montserrat">
                <span>Desenvolvido por</span>
                <a
                  href="https://gameficare.studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Gameficare Studio"
                  className="inline-flex items-center"
                >
                  <img src="public/images/menuxp-logo.svg" alt="Gameficare Studio" className="h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
