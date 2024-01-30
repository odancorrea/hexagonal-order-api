import { Payment } from "../entities/payment";

export default interface IPaymentRepository {
    findById(id: number): Promise<Payment>,
    update(payment: any): Promise<boolean>,
}