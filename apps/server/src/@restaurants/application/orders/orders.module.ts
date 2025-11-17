import { ZodAdapter } from '@api/infra/adapters/validate/validate.adapter'
import { Registry } from '@api/infra/dependency-injection/registry'

import { GetOrdersQueryMongoose } from '@restaurants/application/orders/@queries/get-orders.query'
import { AssignScheduledOrderToOperationController } from '@restaurants/application/orders/assign-scheduled-order-to-operation/assign-scheduled-order-to-operation.controller'
import { AssignScheduledOrderToOperationSchema } from '@restaurants/application/orders/assign-scheduled-order-to-operation/assign-scheduled-order-to-operation.schema'
import { AssignScheduledOrderToOperationUsecase } from '@restaurants/application/orders/assign-scheduled-order-to-operation/assign-scheduled-order-to-operation.usecase'
import { DeleteOrderController } from '@restaurants/application/orders/delete-order/delete-order.controller'
import { DeleteOrderSchema } from '@restaurants/application/orders/delete-order/delete-order.schema'
import { DeleteOrderUsecase } from '@restaurants/application/orders/delete-order/delete-order.usecase'
import { GetOrderController } from '@restaurants/application/orders/get-order/get-order.controller'
import { GetOrderSchema } from '@restaurants/application/orders/get-order/get-order.schema'
import { GetOrderUsecase } from '@restaurants/application/orders/get-order/get-order.usecase'
import { GetOrdersController } from '@restaurants/application/orders/get-orders/get-orders.controller'
import { GetOrdersSchema } from '@restaurants/application/orders/get-orders/get-orders.schema'
import { GetOrdersUsecase } from '@restaurants/application/orders/get-orders/get-orders.usecase'
import { UpdateOrderController } from '@restaurants/application/orders/update-order/update-order.controller'
import { UpdateOrderSchema } from '@restaurants/application/orders/update-order/update-order.schema'
import { UpdateOrderUsecase } from '@restaurants/application/orders/update-order/update-order.usecase'

export class OrdersModule {
  constructor() {
    const registry = Registry.getInstance()

    registry.provide('GetOrdersQuery', new GetOrdersQueryMongoose())

    registry.provide('AssignScheduledOrderToOperationValidate', new ZodAdapter(AssignScheduledOrderToOperationSchema))
    registry.provide('AssignScheduledOrderToOperationUsecase', new AssignScheduledOrderToOperationUsecase())
    new AssignScheduledOrderToOperationController()

    registry.provide('DeleteOrderValidate', new ZodAdapter(DeleteOrderSchema))
    registry.provide('DeleteOrderUsecase', new DeleteOrderUsecase())
    new DeleteOrderController()

    registry.provide('GetOrderValidate', new ZodAdapter(GetOrderSchema))
    registry.provide('GetOrderUsecase', new GetOrderUsecase())
    new GetOrderController()

    registry.provide('GetOrdersValidate', new ZodAdapter(GetOrdersSchema))
    registry.provide('GetOrdersUsecase', new GetOrdersUsecase())
    new GetOrdersController()

    registry.provide('UpdateOrderValidate', new ZodAdapter(UpdateOrderSchema))
    registry.provide('UpdateOrderUsecase', new UpdateOrderUsecase())
    new UpdateOrderController()
  }
}
