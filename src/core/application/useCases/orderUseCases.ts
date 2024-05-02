import iOrderUseCases from "./iOrderUseCases";
import { Order } from "../../domain/entities/order";
import IOrderRepository from "../../domain/repositories/iOrderRepository";
import IOrderQueue from "../../domain/repositories/iOrderQueue";
import IClientRepository from "../../domain/repositories/iClientRepository";
import IProductRepository from "../../domain/repositories/iProductRepository";

class OrderUseCases implements iOrderUseCases {
    constructor (
        private orderRepository: IOrderRepository,
        private orderQueue: IOrderQueue,
        private clientRepository: IClientRepository,
        private productRepository: IProductRepository
    ) {}
    
    async find(): Promise<Order[] | []> {
        let orders = await this.orderRepository.find()
        return orders
    }

    async checkout(id: number): Promise<boolean> {
        let order = await this.orderRepository.findById(id)
        console.log(order)
        if (order) {
            const order2 = {
                idOrder:1,
                date: "2024-05-02T09:00:00.000",
                status: 1,
                client: 1,
                products: [4]
            }
            this.orderQueue.sendToQueue(JSON.stringify(order2), process.env.QUEUE_NAME || 'orders_queue')
            // order.status = Order.ORDER_STATUS_RECEIVED
            // await this.orderRepository.update(order)
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

    async create(orderInfo: any): Promise<Order | boolean> {
        const client = await this.clientRepository.findBy('id', orderInfo.id)
        const products = await this.productRepository.findByIds(orderInfo.products)
        orderInfo.client = client
        orderInfo.products = products
        console.log(orderInfo)
        return await this.orderRepository.create(orderInfo)
    }
}

export default OrderUseCases