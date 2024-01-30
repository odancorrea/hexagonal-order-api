import iOrderUseCases from "./iOrderUseCases";
import { Order } from "../../domain/entities/order";
import IOrderRepository from "../../domain/repositories/iOrderRepository";

class OrderUseCases implements iOrderUseCases {
    constructor (private orderRepository: IOrderRepository) {}
    
    async find(): Promise<Order[] | []> {
        let orders = await this.orderRepository.find()
        return orders
    }

    async checkout(id: number): Promise<boolean> {
        let order = await this.orderRepository.findById(id)
        if (order) {
            order.status = Order.ORDER_STATUS_RECEIVED
            await this.orderRepository.update(order)
            return true
        }

        return false
    }

    async setStatus(id: number, orderInfo: any): Promise<boolean> {
        let order = await this.orderRepository.findById(id)
        if (order) {
            await this.orderRepository.update(Object.assign(order, orderInfo))
            return true
        }

        return false
    }
}

export default OrderUseCases