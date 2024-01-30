import { Order } from "../../../../core/domain/entities/order";
import IOrderRepository from "../../../../core/domain/repositories/iOrderRepository";
import dataSource from "../dataSource";

class OrderRepository implements IOrderRepository{
    async find(): Promise<Order[] | []> {
        try {
            const orderRepository = dataSource.getDataSource().getRepository(Order)
            orderRepository.createQueryBuilder("order")
                .where("order.status <> :status", { status: Order.ORDER_STATUS_DONE})
                .orderBy({
                    "order.status": "DESC",
                    "order.date": "ASC",
                })

            return await orderRepository.find()    
        } catch (error) {
            console.log(error)
            return []
        }
    }

    async findById(id: number): Promise<Order> {
        const orderRepository = dataSource.getDataSource().getRepository(Order)
        return await orderRepository.findOneBy({ id: id }) 
    }

    async update(order: any): Promise<boolean> {
        try {
            const orderRepository = dataSource.getDataSource().getRepository(Order)
            await orderRepository.save(order)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async checkout(order: any): Promise<boolean> {
        try {
            const orderRepository = dataSource.getDataSource().getRepository(Order)
            await orderRepository.delete(order)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
}

export default OrderRepository