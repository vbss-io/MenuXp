import mongoose from 'mongoose'

import { InternalServerError } from '@api/domain/errors'
import { Logger } from '@api/infra/adapters/logger/logger.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

export interface DatabaseConnection {
  connect: () => Promise<void>
  close: () => Promise<void>
}

export class MongooseAdapter implements DatabaseConnection {
  connection: string

  @inject('Logger')
  private readonly Logger!: Logger

  constructor(readonly connectionString?: string) {
    this.connection = (connectionString ?? process.env.MONGO_URL) as string
  }

  async connect(): Promise<void> {
    try {
      await mongoose.connect(this.connection)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      this.Logger.error(errorMessage)
      throw new InternalServerError('Database Connection Error')
    }
  }

  async close(): Promise<void> {
    try {
      await mongoose.connection.close()
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      this.Logger.error(errorMessage)
      throw new InternalServerError('Database Connection Close Error')
    }
  }
}
