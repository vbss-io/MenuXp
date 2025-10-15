import { GameControllerIcon, GiftIcon, TargetIcon, TrendUpIcon } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import React from 'react'

import * as S from './styles'

const MiniGames: React.FC = () => {
  const features = [
    {
      icon: <GameControllerIcon size={20} weight="fill" />,
      text: 'Escolha jogos conforme seu plano'
    },
    {
      icon: <TargetIcon size={20} weight="fill" />,
      text: 'Defina metas (ex.: 1000 pontos = 20% off)'
    },
    {
      icon: <TrendUpIcon size={20} weight="fill" />,
      text: 'Mais frequência, maior ticket e fidelização'
    }
  ]

  return (
    <S.MiniGamesSection id="minigames">
      <S.MiniGamesContainer>
        <S.MiniGamesGrid>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <S.ContentHeader>
              <S.Title>Mini-jogos que viram vendas</S.Title>
              <S.Description>
                Transforme a espera em diversão! Seus clientes jogam enquanto aguardam o pedido e ganham cupons para a
                próxima compra. Uma estratégia divertida para aumentar fidelização e ticket médio.
              </S.Description>
            </S.ContentHeader>
            <S.FeaturesList>
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <S.FeatureItem>
                    <S.FeatureIcon>{feature.icon}</S.FeatureIcon>
                    <S.FeatureText>{feature.text}</S.FeatureText>
                  </S.FeatureItem>
                </motion.div>
              ))}
            </S.FeaturesList>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <S.GameExampleCard>
              <S.CardHeader>
                <S.GameIcon>
                  <GiftIcon size={32} weight="fill" />
                </S.GameIcon>
                <S.CardTitle>Exemplo de Cupom via Jogo</S.CardTitle>
              </S.CardHeader>
              <S.CardContent>
                <S.CouponCard>
                  <S.CouponInfo>
                    <S.CouponCode>GAME1000</S.CouponCode>
                    <S.CouponDescription>Código único por cliente</S.CouponDescription>
                  </S.CouponInfo>
                  <S.CouponBadge>20% OFF</S.CouponBadge>
                </S.CouponCard>
                <S.ExplanationCard>
                  <S.ExplanationText>
                    <strong>Como funciona:</strong> Cliente atinge 1000 pontos no mini-jogo e recebe um código único
                    para usar no próximo pedido.
                  </S.ExplanationText>
                </S.ExplanationCard>
                <S.BenefitsGrid>
                  <S.BenefitItem>
                    <S.BenefitText>+ Conversão</S.BenefitText>
                  </S.BenefitItem>
                  <S.BenefitItem>
                    <S.BenefitText>Aumento de Ticket Médio</S.BenefitText>
                  </S.BenefitItem>
                  <S.BenefitItem>
                    <S.BenefitText>Maior recorrência</S.BenefitText>
                  </S.BenefitItem>
                </S.BenefitsGrid>
              </S.CardContent>
            </S.GameExampleCard>
          </motion.div>
        </S.MiniGamesGrid>
      </S.MiniGamesContainer>
    </S.MiniGamesSection>
  )
}

export default MiniGames
