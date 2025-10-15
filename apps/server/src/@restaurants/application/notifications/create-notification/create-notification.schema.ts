import { NotificationType } from '@restaurants/domain/notifications/enums/notification-type.enum'
import { RecipientType } from '@restaurants/domain/notifications/enums/recipient-type.enum'
import { z } from 'zod'

export const CreateNotificationSchema = z.object({
  type: z.nativeEnum(NotificationType, {
    required_error: 'type is required',
    invalid_type_error: 'type must be a valid NotificationType'
  }),
  recipientType: z.nativeEnum(RecipientType, {
    required_error: 'recipientType is required',
    invalid_type_error: 'recipientType must be a valid RecipientType'
  }),
  recipientId: z
    .string({
      required_error: 'recipientId is required',
      invalid_type_error: 'recipientId must be a string'
    })
    .min(1, 'recipientId cannot be empty'),
  title: z
    .string({
      required_error: 'title is required',
      invalid_type_error: 'title must be a string'
    })
    .min(1, 'title cannot be empty')
    .max(200, 'title cannot exceed 200 characters'),
  message: z
    .string({
      required_error: 'message is required',
      invalid_type_error: 'message must be a string'
    })
    .min(1, 'message cannot be empty')
    .max(1000, 'message cannot exceed 1000 characters'),
  metadata: z.record(z.any()).optional()
})

export type CreateNotificationType = z.infer<typeof CreateNotificationSchema>
