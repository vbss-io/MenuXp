import mongoose from 'mongoose'

import { DatabaseConnection } from '@api/infra/adapters/database/database.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

export interface CheckStatusQueryOutput {
  status: boolean
}

export interface CheckStatusQuery {
  execute: () => Promise<CheckStatusQueryOutput>
}

export class CheckStatusQueryMongoose implements CheckStatusQuery {
  @inject('MongooseConnection')
  private readonly MongooseConnection!: DatabaseConnection

  async execute(): Promise<CheckStatusQueryOutput> {
    try {
      await this.MongooseConnection.connect()
      if (!mongoose.connection.db) return { status: false }
      const result = await mongoose.connection.db.admin().ping()
      return { status: result.ok === 1 }
    } catch {
      return { status: false }
    }
  }
}
