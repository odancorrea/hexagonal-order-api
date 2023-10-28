import iOrderUseCases from "./iOrderUseCases";
import { Order } from "../../domain/entities/order";
import IOrderRepository from "../../domain/repositories/iOrderRepository";

class OrderUseCases implements iOrderUseCases {
    constructor (private orderRepository: IOrderRepository) {}
    
    async find(): Promise<Order[] | []> {
        let orders = this.orderRepository.find()
        return orders
    }

    async checkout(id: number): Promise<boolean> {
        let order = await this.orderRepository.findById(id)
        if (order) {
            order.status = 'checkout'
            await this.orderRepository.update(order)
            return true
        }

        return false
    }
}

export default OrderUseCases