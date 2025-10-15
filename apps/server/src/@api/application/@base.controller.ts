import type { HttpServer } from '@api/infra/adapters/http/http-server.adapter'
import { Queue } from '@api/infra/adapters/queue/queue.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { RequestFacade } from '@api/infra/facades/request.facade'

export class BaseController {
  @inject('HttpServer')
  protected readonly HttpServer!: HttpServer

  @inject('RequestFacade')
  protected readonly RequestFacade!: RequestFacade

  @inject('Queue')
  protected readonly Queue!: Queue
}
