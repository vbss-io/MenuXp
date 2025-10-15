import { type ZodSchema, type ZodTypeDef } from 'zod'

export interface InputValidate<T> {
  validate: (value: T) => T
}

export interface FormDataInputValidate<TInput, TOutput> {
  validate: (value: TInput) => TOutput
}

export class ZodAdapter<T> implements InputValidate<T> {
  constructor(private readonly schema: ZodSchema<T>) {}

  validate(value: T): T {
    return this.schema.parse(value)
  }
}

export class FormDataZodAdapter<TInput, TOutput> implements FormDataInputValidate<TInput, TOutput> {
  constructor(private readonly schema: ZodSchema<TOutput, ZodTypeDef, TInput>) {}

  validate(value: TInput): TOutput {
    return this.schema.parse(value)
  }
}
