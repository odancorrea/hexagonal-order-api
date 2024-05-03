import { Payment } from "../../domain/entities/payment";

export default interface iPaymentUseCases {
    getStatus(id: number): Promise<String | boolean>,
    setStatus(id: number, paymentInfo: any): Promise<boolean>,
    pay(id: number): Promise<boolean>,
    create(paymentInfo: any): Promise<Payment | undefined>,
    find(): Promise<Payment[] | []>
}