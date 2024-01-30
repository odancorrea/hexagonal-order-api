import { Order } from "../../domain/entities/order";

export default interface iOrderUseCases {
    find(): Promise<Order[] | []>,
    checkout(id: number): Promise<boolean>
    setStatus(id: number, orderInfo: any): Promise<boolean>,
}