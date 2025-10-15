import { z } from 'zod';

export const CategoryOptionalSchema = z
  .string({
    invalid_type_error: 'optionals must be a JSON string'
  })
  .optional()
  .transform((val) => {
    if (!val) return []
    try {
      return JSON.parse(val) as Array<{ name: string; maxQuantity?: number; price: number }>
    } catch {
      return []
    }
  })
  .refine((val) => Array.isArray(val), {
    message: 'optionals must be an array'
  })
  .refine(
    (val) =>
      val.every(
        (item) =>
          typeof item === 'object' &&
          item !== null &&
          typeof item.name === 'string' &&
          item.name.length > 0 &&
          (item.maxQuantity === undefined || (typeof item.maxQuantity === 'number' && item.maxQuantity >= 0)) &&
          typeof item.price === 'number' &&
          item.price >= 0
      ),
    {
      message: 'optionals must contain valid objects with name, optional maxQuantity, and price'
    }
  )
