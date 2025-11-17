import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const ReportFiltersSchema = z
  .object({
    restaurantId: ObjectIdSchema,
    dateRange: z.object({
      start: z
        .string({
          required_error: 'dateRange.start is required',
          invalid_type_error: 'dateRange.start must be a string'
        })
        .datetime('dateRange.start must be a valid ISO datetime'),
      end: z
        .string({
          required_error: 'dateRange.end is required',
          invalid_type_error: 'dateRange.end must be a string'
        })
        .datetime('dateRange.end must be a valid ISO datetime')
    }),
    categoryIds: z.array(ObjectIdSchema).optional(),
    menuItemIds: z.array(ObjectIdSchema).optional(),
    comboIds: z.array(ObjectIdSchema).optional(),
    customerSegments: z.array(z.enum(['new', 'returning'])).optional(),
    operationTypes: z.array(z.string()).optional(),
    couponCodes: z.array(z.string()).optional(),
    chartGranularity: z.enum(['daily', 'weekly', 'monthly']).optional().default('daily')
  })
  .refine(
    (data) => {
      const start = new Date(data.dateRange.start)
      return start < new Date(data.dateRange.end)
    },
    {
      message: 'dateRange.start must be before dateRange.end',
      path: ['dateRange', 'start']
    }
  )
  .refine(
    (data) => {
      const start = new Date(data.dateRange.start)
      const twelveMonthsAgo = new Date()
      twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12)
      return start >= twelveMonthsAgo
    },
    {
      message: 'dateRange cannot exceed 12 months from current date',
      path: ['dateRange', 'start']
    }
  )

export type ReportFiltersType = z.infer<typeof ReportFiltersSchema>

export const ReportsSectionSchema = z.enum([
  'summary',
  'orders',
  'items',
  'categories',
  'customers',
  'operations',
  'coupons'
])

export type ReportsSectionType = z.infer<typeof ReportsSectionSchema>
