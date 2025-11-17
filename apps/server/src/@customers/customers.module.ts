import { Registry } from '@api/infra/dependency-injection/registry'

import { CartModule } from '@customers/application/cart/cart.module'
import { CouponsModule } from '@customers/application/coupons/coupons.module'
import { LeadsModule } from '@customers/application/leads/leads.module'
import { MenuModule } from '@customers/application/menu/menu.module'
import { CustomerNotificationsModule as NotificationsModule } from '@customers/application/notifications/notifications.module'
import { OrdersModule } from '@customers/application/orders/orders.module'
import { RestaurantModule } from '@customers/application/restaurant/restaurant.module'
import { CustomerUsersModule } from '@customers/application/users/customer-users.module'
import { WhatsAppVerificationModule } from '@customers/application/whatsapp-verification/whatsapp-verification.module'
import { CartRepositoryMongoose } from '@customers/infra/repositories/cart.repository'
import { CustomerUserRepositoryMongoose } from '@customers/infra/repositories/customer-user.repository'
import { LeadRepositoryMongoose } from '@customers/infra/repositories/lead.repository'
import { WhatsAppVerificationRepositoryMongoose } from '@customers/infra/repositories/whatsapp-verification.repository'

export class CustomersModule {
  constructor() {
    const registry = Registry.getInstance()

    registry.provide('CustomerUserRepository', new CustomerUserRepositoryMongoose())
    registry.provide('CartRepository', new CartRepositoryMongoose())
    registry.provide('LeadRepository', new LeadRepositoryMongoose())
    registry.provide('WhatsAppVerificationRepository', new WhatsAppVerificationRepositoryMongoose())

    new CartModule()
    new CouponsModule()
    new LeadsModule()
    new MenuModule()
    new NotificationsModule()
    new OrdersModule()
    new RestaurantModule()
    new CustomerUsersModule()
    new WhatsAppVerificationModule()
  }
}
