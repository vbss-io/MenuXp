import { createLead, createLeadSchema, type CreateLeadInput } from '@/services/lead/create-lead'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormInput, FormTextarea } from '@menuxp/ui'
import { ArrowRightIcon } from '@phosphor-icons/react'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import * as S from './styles'

const LeadForm: React.FC = () => {
  const createLeadMutation = useMutation({
    mutationFn: (data: CreateLeadInput) => createLead(data),
    onError: (error) => {
      console.error('Erro ao criar lead:', error)
    }
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<CreateLeadInput>({
    resolver: zodResolver(createLeadSchema),
    defaultValues: {
      name: '',
      email: '',
      whatsapp: '',
      scenario: ''
    }
  })

  const onSubmit = async (data: CreateLeadInput) => {
    try {
      await createLeadMutation.mutateAsync(data)
      toast.success('Obrigado! Entraremos em contato em até 1 dia útil.')
      reset()
    } catch {
      toast.error('Erro ao enviar formulário. Tente novamente.')
    }
  }

  return (
    <S.LeadFormCard>
      <S.FormTitle>Solicite uma demonstração</S.FormTitle>
      <S.Form onSubmit={handleSubmit(onSubmit)} aria-label="Formulário para solicitar demonstração">
        <S.FormFields>
          <FormInput
            id="name"
            label="Nome"
            placeholder="Seu nome completo"
            required
            register={register('name')}
            error={errors.name?.message}
          />
          <FormInput
            id="email"
            label="E-mail"
            type="email"
            placeholder="seu.email@exemplo.com"
            required
            register={register('email')}
            error={errors.email?.message}
          />
          <FormInput
            id="whatsapp"
            label="WhatsApp"
            placeholder="(11) 99999-9999"
            register={register('whatsapp')}
            error={errors.whatsapp?.message}
          />
          <FormTextarea
            id="scenario"
            label="Conte-nos sobre seu cenário"
            placeholder="Tipo de restaurante, volume de pedidos, principais desafios..."
            rows={4}
            register={register('scenario')}
            error={errors.scenario?.message}
          />
          <S.SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <S.LoadingSpinner />
                Enviando...
              </>
            ) : (
              <>
                <ArrowRightIcon size={20} weight="bold" />
                Quero ver uma demo
              </>
            )}
          </S.SubmitButton>
          <S.FormFooter>Ao enviar, entraremos em contato em até 1 dia útil.</S.FormFooter>
        </S.FormFields>
      </S.Form>
    </S.LeadFormCard>
  )
}

export default LeadForm
