import { Order } from "../entities/order";

export default interface IOrderRepository {
    find(): Promise<Order[] | []>,
    findById(id: number): Promise<Order>,
    update(order: any): Promise<boolean>,
    checkout(id: number): Promise<boolean>,
}