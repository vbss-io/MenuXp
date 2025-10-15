import { StatusModule } from '@api/application/status/status.module'

export class ApiModule {
  constructor() {
    new StatusModule()
  }
}
