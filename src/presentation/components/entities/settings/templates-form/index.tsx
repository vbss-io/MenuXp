import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/presentation/components/ui/button'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

import { UpdateRestaurantSettingsUsecase } from '@/application/restaurants/update-restaurant-settings.usecase'
import type { Templates } from '@/domain/models/restaurant.model'
import { FormTextarea } from '@/presentation/components/ui/form-textarea'
import { Loading } from '@/presentation/@to-do/components/ui/loading'
import { useAuth } from '@/presentation/hooks/use-auth'
import { useRestaurant } from '@/presentation/hooks/use-restaurant'

import * as S from './styles'

const templatesSchema = z.object({
  order_received: z
    .string()
    .min(1, 'Mensagem é obrigatória')
    .refine((value) => value.includes('#{order_id}'), 'Deve conter a tag #{order_id}'),
  order_confirmed: z
    .string()
    .min(1, 'Mensagem é obrigatória')
    .refine((value) => value.includes('#{order_id}'), 'Deve conter a tag #{order_id}'),

  order_in_production: z
    .string()
    .min(1, 'Mensagem é obrigatória')
    .refine((value) => value.includes('#{order_id}'), 'Deve conter a tag #{order_id}'),
  order_ready: z
    .string()
    .min(1, 'Mensagem é obrigatória')
    .refine((value) => value.includes('#{order_id}'), 'Deve conter a tag #{order_id}'),
  order_out_for_delivery: z
    .string()
    .min(1, 'Mensagem é obrigatória')
    .refine((value) => value.includes('#{order_id}'), 'Deve conter a tag #{order_id}'),
  order_delivered: z
    .string()
    .min(1, 'Mensagem é obrigatória')
    .refine((value) => value.includes('#{order_id}'), 'Deve conter a tag #{order_id}'),
  order_canceled: z
    .string()
    .min(1, 'Mensagem é obrigatória')
    .refine((value) => value.includes('#{order_id}'), 'Deve conter a tag #{order_id}')
    .refine((value) => value.includes('#{cancel_reason}'), 'Deve conter a tag #{cancel_reason}')
})

type TemplatesFormData = z.infer<typeof templatesSchema>

const templateLabels = {
  order_received: 'Pedido Recebido',
  order_confirmed: 'Pedido Confirmado',
  order_in_production: 'Pedido em Produção',
  order_ready: 'Pedido Pronto',
  order_out_for_delivery: 'Pedido Saiu para Entrega',
  order_delivered: 'Pedido Entregue',
  order_canceled: 'Pedido Cancelado'
}

const templateDescriptions = {
  order_received: 'Enviada quando o pedido é recebido pelo sistema',
  order_confirmed: 'Enviada quando o pedido é confirmado pelo restaurante',
  order_in_production: 'Enviada quando o pedido entra em produção',
  order_ready: 'Enviada quando o pedido está pronto para retirada/entrega',
  order_out_for_delivery: 'Enviada quando o pedido sai para entrega',
  order_delivered: 'Enviada quando o pedido é entregue',
  order_canceled: 'Enviada quando o pedido é cancelado (requer #{cancel_reason})'
}

const templateExamples = {
  order_received: 'Pedido #{order_id} recebido! Estamos processando sua solicitação.',
  order_confirmed: 'Pedido #{order_id} confirmado! Iniciaremos a preparação em breve.',
  order_in_production: 'Pedido #{order_id} em produção! Seu pedido está sendo preparado.',
  order_ready: 'Pedido #{order_id} pronto! Pode retirar no balcão.',
  order_out_for_delivery: 'Pedido #{order_id} saiu para entrega! Entregador a caminho.',
  order_delivered: 'Pedido #{order_id} entregue! Obrigado por escolher nosso restaurante.',
  order_canceled: 'Pedido #{order_id} cancelado. Motivo: #{cancel_reason}'
}

export const TemplatesForm = () => {
  const { restaurant, refreshRestaurant } = useRestaurant()
  const { restaurantId } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<TemplatesFormData>({
    resolver: zodResolver(templatesSchema),
    defaultValues: getDefaultValues()
  })

  useEffect(() => {
    if (restaurant?.settings?.templates) {
      const defaultValues = getDefaultValues()
      reset(defaultValues)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurant?.settings?.templates])

  function getDefaultValues(): TemplatesFormData {
    const templates = restaurant?.settings?.templates
    return {
      order_received: templates?.order_received ?? '',
      order_confirmed: templates?.order_confirmed ?? '',
      order_canceled: templates?.order_canceled ?? '',
      order_in_production: templates?.order_in_production ?? '',
      order_ready: templates?.order_ready ?? '',
      order_out_for_delivery: templates?.order_out_for_delivery ?? '',
      order_delivered: templates?.order_delivered ?? ''
    }
  }

  const onSubmit = async (data: TemplatesFormData) => {
    if (!restaurantId) return
    setIsLoading(true)
    try {
      const updateSettingsUsecase = new UpdateRestaurantSettingsUsecase()
      await updateSettingsUsecase.execute({
        restaurantId,
        templates: data
      })
      toast.success('Templates de mensagens atualizados com sucesso!')
      await refreshRestaurant()
    } catch (error) {
      toast.error('Erro ao atualizar templates de mensagens')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const sectionVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  }

  const formGroupVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  }

  return (
    <S.FormContainer onSubmit={handleSubmit(onSubmit)} variants={containerVariants} initial="hidden" animate="visible">
      <S.Section variants={sectionVariants}>
        <S.SectionTitle>Templates de Mensagens</S.SectionTitle>
        <S.SectionDescription>
          Configure as mensagens enviadas automaticamente para seus clientes. Use as tags {'#{order_id}'} e{' '}
          {'#{cancel_reason}'} que serão substituídas pelos valores reais.
        </S.SectionDescription>
        <S.TemplatesGrid>
          {(Object.keys(templateLabels) as Array<keyof Templates>).map((templateKey) => (
            <S.TemplateCard key={templateKey} variants={formGroupVariants}>
              <S.TemplateHeader>
                <S.TemplateTitle>{templateLabels[templateKey]}</S.TemplateTitle>
                <S.TemplateDescription>{templateDescriptions[templateKey]}</S.TemplateDescription>
              </S.TemplateHeader>
              <S.TemplateInputGroup>
                <FormTextarea
                  id={templateKey}
                  label="Mensagem"
                  placeholder={templateExamples[templateKey]}
                  error={errors[templateKey]?.message}
                  register={register(templateKey)}
                  rows={3}
                />
              </S.TemplateInputGroup>
              <S.TagsInfo>
                <S.TagsTitle>Tags disponíveis:</S.TagsTitle>
                <S.TagsList>
                  <S.Tag>{'#{order_id}'}</S.Tag>
                  {templateKey === 'order_canceled' && <S.Tag>{'#{cancel_reason}'}</S.Tag>}
                </S.TagsList>
              </S.TagsInfo>
            </S.TemplateCard>
          ))}
        </S.TemplatesGrid>
      </S.Section>
      <S.SubmitSection>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button type="submit" disabled={isLoading} variant="primary" size="lg">
            {isLoading ? <Loading /> : 'Salvar Templates'}
          </Button>
        </motion.div>
      </S.SubmitSection>
    </S.FormContainer>
  )
}
