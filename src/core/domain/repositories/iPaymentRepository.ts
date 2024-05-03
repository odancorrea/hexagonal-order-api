import { Payment } from "../entities/payment";

export default interface IPaymentRepository {
    findById(id: number): Promise<Payment | undefined>,
    update(payment: any): Promise<boolean>,
    create(payment: any): Promise<Payment | undefined>,
    find(): Promise<Payment[] | []>
}