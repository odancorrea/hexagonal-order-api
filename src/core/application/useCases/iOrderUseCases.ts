import { Order } from "../../domain/entities/order";

export default interface iOrderUseCases {
    find(): Promise<Order[] | []>,
    checkout(id: number): Promise<boolean>
}