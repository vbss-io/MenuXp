import 'dotenv/config'

import { ApiModule } from '@api/api.module'
import { BcryptAdapter } from '@api/infra/adapters/auth/password-auth.adapter'
import { JWTAdapter } from '@api/infra/adapters/auth/token-auth.adapter'
import { InMemoryCacheAdapter } from '@api/infra/adapters/cache/cache.adapter'
import { MongooseAdapter } from '@api/infra/adapters/database/database.adapter'
import { AxiosAdapter } from '@api/infra/adapters/http/http-client.adapter'
import { ExpressAdapter } from '@api/infra/adapters/http/http-server.adapter'
import { WinstonLoggerAdapter } from '@api/infra/adapters/logger/logger.adapter'
import { NodemailerAdapter } from '@api/infra/adapters/mailer/mailer.adapter'
import { InMemoryQueueAdapter } from '@api/infra/adapters/queue/queue.adapter'
import { AzureStorageAdapter } from '@api/infra/adapters/storage/storage.adapter'
import { WhatsAppMessagingAdapter } from '@api/infra/adapters/whatsapp/whatsapp-messaging.adapter'
import { Registry } from '@api/infra/dependency-injection/registry'
import { CancellationTokenSource } from '@api/infra/events/cancellation-token'
import { Mediator } from '@api/infra/events/mediator'
import { RequestFacade } from '@api/infra/facades/request.facade'
import { StripePaymentGateway } from '@api/infra/gateways/stripe.gateway'
import { ExpressAuthHandler } from '@api/infra/handlers/express-auth.handler'
import { ExpressErrorHandler } from '@api/infra/handlers/express-error.handler'
import { ExpressHttpLoggerHandler } from '@api/infra/handlers/express-http-logger.handler'
import { FileConverterService } from '@api/infra/services/file-converter.service'

import { CustomersModule } from '@customers/customers.module'

import { RestaurantsModule } from '@restaurants/restaurants.module'

const PORT = Number(process.env.PORT ?? 3000)

function main(): void {
  const registry = Registry.getInstance()
  const cache = InMemoryCacheAdapter.getInstance()
  registry.provide('Cache', cache)
  registry.provide('Mailer', new NodemailerAdapter())
  registry.provide('Queue', new InMemoryQueueAdapter())
  registry.provide('PasswordAuthentication', new BcryptAdapter())
  registry.provide('TokenAuthentication', new JWTAdapter())
  registry.provide('Logger', new WinstonLoggerAdapter())
  registry.provide('FileStorage', new AzureStorageAdapter())
  registry.provide('Mediator', new Mediator())
  registry.provide('CancellationToken', new CancellationTokenSource())
  registry.provide('RequestFacade', new RequestFacade())
  registry.provide('ErrorHandler', new ExpressErrorHandler())
  registry.provide('AuthHandler', new ExpressAuthHandler())
  registry.provide('HttpLoggerHandler', new ExpressHttpLoggerHandler())
  registry.provide('FileConverterService', new FileConverterService())
  const httpServer = new ExpressAdapter()
  registry.provide('HttpServer', httpServer)
  const httpClient = new AxiosAdapter()
  registry.provide('HttpClient', httpClient)
  registry.provide('WhatsAppMessagingClient', new WhatsAppMessagingAdapter())
  const mongooseConnection = new MongooseAdapter()
  registry.provide('MongooseConnection', mongooseConnection)
  void mongooseConnection.connect()
  const stripeGateway = new StripePaymentGateway()
  registry.provide('SubscriptionPaymentGateway', stripeGateway)

  new ApiModule()
  new CustomersModule()
  new RestaurantsModule()

  httpServer.start(PORT)
}
main()
