import { Registry } from '@api/infra/dependency-injection/registry'

import { AdminModule } from '@restaurants/application/admin/admin.module'
import { AuthModule } from '@restaurants/application/auth/auth.module'
import { CategoriesModule } from '@restaurants/application/categories/categories.module'
import { CombosModule } from '@restaurants/application/combos/combos.module'
import { CouponsModule } from '@restaurants/application/coupons/coupons.module'
import { MenuItemsModule } from '@restaurants/application/menu-items/menu-items.module'
import { MenuLayoutsModule } from '@restaurants/application/menu-layouts/menu-layouts.module'
import { RestaurantNotificationsModule as NotificationsModule } from '@restaurants/application/notifications/notifications.module'
import { OperationsModule } from '@restaurants/application/operations/operations.module'
import { OrdersModule } from '@restaurants/application/orders/orders.module'
import { PlansModule } from '@restaurants/application/plans/plans.module'
import { ReportsModule } from '@restaurants/application/reports/reports.module'
import { RestaurantsModule as RestaurantsModuleApp } from '@restaurants/application/restaurants/restaurants.module'
import { SubscriptionsModule } from '@restaurants/application/subscriptions/subscriptions.module'
import { UsersModule } from '@restaurants/application/users/users.module'
import { CategoryRepositoryMongoose } from '@restaurants/infra/repositories/category.repository'
import { ComboRepositoryMongoose } from '@restaurants/infra/repositories/combo.repository'
import { CouponRepositoryMongoose } from '@restaurants/infra/repositories/coupon.repository'
import { MenuItemRepositoryMongoose } from '@restaurants/infra/repositories/menu-item.repository'
import { MenuLayoutRepositoryMongoose } from '@restaurants/infra/repositories/menu-layout.repository'
import { NotificationRepositoryMongoose } from '@restaurants/infra/repositories/notifications.repository'
import { OperationRepositoryMongoose } from '@restaurants/infra/repositories/operation.repository'
import { OrderStatusHistoryRepositoryMongoose } from '@restaurants/infra/repositories/order-status-history.repository'
import { OrderRepositoryMongoose } from '@restaurants/infra/repositories/orders.repository'
import { PlanRepositoryMongoose } from '@restaurants/infra/repositories/plan.repository'
import { RestaurantRepositoryMongoose } from '@restaurants/infra/repositories/restaurant.repository'
import { StripeWebhookLogRepositoryMongoose } from '@restaurants/infra/repositories/stripe-webhook-log.repository'
import { SubscriptionRepositoryMongoose } from '@restaurants/infra/repositories/subscription.repository'
import { UserRepositoryMongoose } from '@restaurants/infra/repositories/user.repository'
import { WhatsAppNotificationLogRepositoryMongoose } from '@restaurants/infra/repositories/whatsapp-notification-log.repository'

export class RestaurantsModule {
  constructor() {
    const registry = Registry.getInstance()

    registry.provide('MenuItemRepository', new MenuItemRepositoryMongoose())
    registry.provide('RestaurantRepository', new RestaurantRepositoryMongoose())
    registry.provide('UserRepository', new UserRepositoryMongoose())
    registry.provide('PlanRepository', new PlanRepositoryMongoose())
    registry.provide('SubscriptionRepository', new SubscriptionRepositoryMongoose())
    registry.provide('OrderRepository', new OrderRepositoryMongoose())
    registry.provide('OrderStatusHistoryRepository', new OrderStatusHistoryRepositoryMongoose())
    registry.provide('NotificationRepository', new NotificationRepositoryMongoose())
    registry.provide('CategoryRepository', new CategoryRepositoryMongoose())
    registry.provide('OperationRepository', new OperationRepositoryMongoose())
    registry.provide('MenuLayoutRepository', new MenuLayoutRepositoryMongoose())
    registry.provide('CouponRepository', new CouponRepositoryMongoose())
    registry.provide('ComboRepository', new ComboRepositoryMongoose())
    registry.provide('WhatsAppNotificationLogRepository', new WhatsAppNotificationLogRepositoryMongoose())
    registry.provide('StripeWebhookLogRepository', new StripeWebhookLogRepositoryMongoose())

    new AdminModule()
    new AuthModule()
    new CategoriesModule()
    new CombosModule()
    new CouponsModule()
    new MenuItemsModule()
    new MenuLayoutsModule()
    new NotificationsModule()
    new OperationsModule()
    new OrdersModule()
    new PlansModule()
    new ReportsModule()
    new RestaurantsModuleApp()
    new SubscriptionsModule()
    new UsersModule()
  }
}
