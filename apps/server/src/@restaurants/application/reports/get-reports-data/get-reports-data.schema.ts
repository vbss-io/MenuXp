import { z } from 'zod'

import {
  ReportFiltersSchema,
  ReportsSectionSchema
} from '@restaurants/application/reports/@schemas/report-filter.schema'

export const GetReportsDataSchema = z.object({
  filters: ReportFiltersSchema,
  sections: z.array(ReportsSectionSchema).optional()
})

export type GetReportsDataType = z.infer<typeof GetReportsDataSchema>
