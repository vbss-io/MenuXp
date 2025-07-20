import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@vbss-ui/button'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

import { UpdateRestaurantSettingsUsecase } from '@/application/restaurants/update-restaurant-settings.usecase'
import { BusinessWeekDay, businessWeekDayValues } from '@/domain/enums/restaurants/business-week-day.enum'
import type { BusinessHours } from '@/domain/models/restaurant.model'
import { Loading } from '@/presentation/components/ui/loading'
import { useAuth } from '@/presentation/hooks/use-auth'
import { useRestaurant } from '@/presentation/hooks/use-restaurant'

import * as S from './styles'

const createHoursSchema = () => {
  const schemaFields: Record<string, z.ZodOptional<z.ZodString>> = {}

  businessWeekDayValues.forEach((day) => {
    schemaFields[`${day}Start`] = z.string().optional()
    schemaFields[`${day}End`] = z.string().optional()
  })

  return z.object(schemaFields).refine(
    (data) => {
      for (const day of businessWeekDayValues) {
        const hasStart = data[`${day}Start`] && data[`${day}Start`] !== ''
        const hasEnd = data[`${day}End`] && data[`${day}End`] !== ''
        if (hasStart && !hasEnd) return false
        if (!hasStart && hasEnd) return false
      }
      return true
    },
    {
      message: 'Se um horário de início for preenchido, o horário de fim também deve ser preenchido',
      path: ['hours']
    }
  )
}

type HoursFormData = z.infer<ReturnType<typeof createHoursSchema>>

const dayLabels = {
  [BusinessWeekDay.MONDAY]: 'Segunda-feira',
  [BusinessWeekDay.TUESDAY]: 'Terça-feira',
  [BusinessWeekDay.WEDNESDAY]: 'Quarta-feira',
  [BusinessWeekDay.THURSDAY]: 'Quinta-feira',
  [BusinessWeekDay.FRIDAY]: 'Sexta-feira',
  [BusinessWeekDay.SATURDAY]: 'Sábado',
  [BusinessWeekDay.SUNDAY]: 'Domingo'
}

export const HoursForm = () => {
  const { restaurant, refreshRestaurant } = useRestaurant()
  const { restaurantId } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const schema = createHoursSchema()

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm<HoursFormData>({
    resolver: zodResolver(schema),
    defaultValues: getDefaultValues()
  })

  useEffect(() => {
    if (restaurant?.settings?.businessHours) {
      const defaultValues = getDefaultValues()
      reset(defaultValues)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurant?.settings?.businessHours, reset])

  function getDefaultValues() {
    const defaultValues: Record<string, string> = {}
    businessWeekDayValues.forEach((day) => {
      const businessHours = restaurant?.settings?.businessHours?.[day]
      if (businessHours && typeof businessHours === 'string') {
        const [start, end] = businessHours.split('-')
        defaultValues[`${day}Start`] = start ?? ''
        defaultValues[`${day}End`] = end ?? ''
      } else {
        defaultValues[`${day}Start`] = ''
        defaultValues[`${day}End`] = ''
      }
    })
    return defaultValues
  }

  const watchedValues = watch()

  const formatBusinessHours = (data: HoursFormData) => {
    const businessHours: Record<string, string> = {}
    businessWeekDayValues.forEach((day) => {
      const start = data[`${day}Start`]
      const end = data[`${day}End`]
      if (start && end && start !== '' && end !== '') businessHours[day] = `${start}-${end}`
    })
    return businessHours
  }

  const onSubmit = async (data: HoursFormData) => {
    if (!restaurantId) return
    setIsLoading(true)
    try {
      const businessHours = formatBusinessHours(data)
      const updateSettingsUsecase = new UpdateRestaurantSettingsUsecase()
      await updateSettingsUsecase.execute({
        restaurantId,
        businessHours: businessHours as unknown as BusinessHours
      })
      toast.success('Horários de funcionamento atualizados com sucesso!')
      await refreshRestaurant()
    } catch (error) {
      toast.error('Erro ao atualizar horários de funcionamento')
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
        <S.SectionTitle>Horários de Funcionamento</S.SectionTitle>
        <S.SectionDescription>Configure os horários de funcionamento para cada dia da semana</S.SectionDescription>
        <S.HoursGrid>
          {businessWeekDayValues.map((day) => {
            const startValue = watchedValues[`${day}Start`]
            const endValue = watchedValues[`${day}End`]
            const hasStart = startValue && startValue !== ''
            const hasEnd = endValue && endValue !== ''
            return (
              <S.DayRow key={day} variants={formGroupVariants}>
                <S.DayLabel>{dayLabels[day]}</S.DayLabel>
                <S.TimeInputs>
                  <S.TimeInputGroup>
                    <S.TimeLabel htmlFor={`${day}Start`}>Início</S.TimeLabel>
                    <S.TimeInput
                      id={`${day}Start`}
                      type="time"
                      {...register(`${day}Start`)}
                      $hasError={!!(hasStart && !hasEnd)}
                    />
                    {hasStart && !hasEnd && <S.FieldError>Horário de fim é obrigatório</S.FieldError>}
                  </S.TimeInputGroup>
                  <S.TimeInputGroup>
                    <S.TimeLabel htmlFor={`${day}End`}>Fim</S.TimeLabel>
                    <S.TimeInput
                      id={`${day}End`}
                      type="time"
                      {...register(`${day}End`)}
                      $hasError={!!(hasEnd && !hasStart)}
                    />
                    {hasEnd && !hasStart && <S.FieldError>Horário de início é obrigatório</S.FieldError>}
                  </S.TimeInputGroup>
                </S.TimeInputs>
              </S.DayRow>
            )
          })}
        </S.HoursGrid>
        {errors.hours && <S.ErrorMessage>{errors.hours.message}</S.ErrorMessage>}
      </S.Section>
      <S.SubmitSection>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button type="submit" disabled={isLoading} variant="primary" size="lg">
            {isLoading ? <Loading /> : 'Salvar Horários'}
          </Button>
        </motion.div>
      </S.SubmitSection>
    </S.FormContainer>
  )
}
