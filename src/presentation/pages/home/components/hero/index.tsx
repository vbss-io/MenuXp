import { ArrowRightIcon, EyeIcon, GlobeIcon, PhoneIcon, QrCodeIcon, ShieldCheckIcon } from '@phosphor-icons/react'
import { motion, useReducedMotion } from 'framer-motion'
import React, { useEffect, useState } from 'react'

import { Button } from '@/presentation/components/ui/button'
import { Chip } from '@/presentation/components/ui/chip'
import {
  PhoneBadge,
  PhoneContent,
  PhoneFrame,
  PhoneImage,
  PhoneIndicator,
  PhoneIndicators,
  PhoneMockup,
  PhoneScreen,
  PhoneStatusBar
} from '@/presentation/components/ui/phone-mockup'
import {
  Section,
  SectionContent,
  SectionGrid,
  SectionTextContent,
  SectionVisualContent
} from '@/presentation/components/ui/section'
import { FeatureIcon, FeatureItem, FeatureList, FeatureText } from '@/presentation/pages/home/components/hero-features'
import { Highlight } from '@/presentation/pages/home/components/hero-highlight'

import * as S from './styles'

export const Hero: React.FC = () => {
  const [currentMockup, setCurrentMockup] = useState(0)
  const prefersReduced = useReducedMotion()
  const mockups = [
    { alt: 'Template Clássico', src: 'public/images/menu-layouts/01.png' },
    { alt: 'Template Dark', src: 'public/images/menu-layouts/02.png' },
    { alt: 'Template Clean', src: 'public/images/menu-layouts/03.png' },
    { alt: 'Template Brutalista', src: 'public/images/menu-layouts/04.png' }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMockup((prev) => (prev + 1) % mockups.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [mockups.length])

  const features = [
    {
      icon: <ShieldCheckIcon size={20} weight="fill" />,
      text: 'Controle total da marca'
    },
    {
      icon: <QrCodeIcon size={20} weight="fill" />,
      text: 'Pedido via QR/URL própria'
    },
    {
      icon: <GlobeIcon size={20} weight="fill" />,
      text: 'Multi-idiomas (digital & impresso)'
    },
    {
      icon: <PhoneIcon size={20} weight="fill" />,
      text: 'Acompanhamento por WhatsApp/SMS'
    }
  ]

  const handleScrollTo = (target: string) => {
    const element = document.querySelector(target)
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80
      window.scrollTo({ top: offsetTop, behavior: 'smooth' })
    }
  }

  return (
    <Section background="white" minHeight="calc(100vh - 5rem)" padding="2rem 0">
      <SectionContent>
        <SectionGrid>
          <SectionTextContent>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <S.HeroTitle>
                Seu app de pedidos
                <br className="mobile-only" />
                <Highlight size="1.5rem">sem taxas</Highlight>
                <br className="mobile-only" />e com <Highlight size="1.8rem">IA e Gamificação</Highlight>
              </S.HeroTitle>
              <S.HeroDescription>
                O MenuXP coloca o seu restaurante no controle: pedidos via QR Code ou URL, gestão facilidada,
                multi-idiomas, cardápio para impressão e mini-jogos com cupons para reter clientes.
              </S.HeroDescription>
              <S.HeroButtonGroup>
                <Button
                  variant="primary"
                  onClick={() => handleScrollTo('#demo')}
                  leftIcon={<ArrowRightIcon size={20} weight="bold" />}
                >
                  Agendar demonstração
                </Button>
                <Button
                  variant="white"
                  onClick={() => handleScrollTo('#recursos')}
                  leftIcon={<EyeIcon size={20} weight="bold" />}
                >
                  Ver recursos
                </Button>
              </S.HeroButtonGroup>
              <S.HeroChipGroup>
                <Chip>Whitelabel</Chip>
                <Chip>Sem login</Chip>
                <Chip>Multi-idiomas</Chip>
              </S.HeroChipGroup>
              <FeatureList>
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <FeatureItem>
                      <FeatureIcon>{feature.icon}</FeatureIcon>
                      <FeatureText>{feature.text}</FeatureText>
                    </FeatureItem>
                  </motion.div>
                ))}
              </FeatureList>
            </motion.div>
          </SectionTextContent>
          <SectionVisualContent>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <PhoneMockup>
                <S.PhoneBadgeContainer>
                  <motion.div
                    role="status"
                    aria-label="+10 templates disponíveis"
                    initial={{ scale: 1, y: 0 }}
                    animate={prefersReduced ? { y: 0, scale: 1 } : { y: [0, -4, 0], scale: [1, 1.06, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ willChange: 'transform' }}
                  >
                    <PhoneBadge>App do seu jeito!</PhoneBadge>
                  </motion.div>
                </S.PhoneBadgeContainer>
                <PhoneFrame>
                  <PhoneScreen>
                    <PhoneStatusBar></PhoneStatusBar>
                    <PhoneContent>
                      <PhoneImage
                        key={currentMockup}
                        src={mockups[currentMockup].src}
                        alt={mockups[currentMockup].alt}
                        loading="eager"
                        decoding="async"
                      />
                    </PhoneContent>
                  </PhoneScreen>
                </PhoneFrame>
                <PhoneIndicators>
                  {mockups.map((_, index) => (
                    <PhoneIndicator key={index} active={index === currentMockup} />
                  ))}
                </PhoneIndicators>
              </PhoneMockup>
            </motion.div>
          </SectionVisualContent>
        </SectionGrid>
      </SectionContent>
    </Section>
  )
}
