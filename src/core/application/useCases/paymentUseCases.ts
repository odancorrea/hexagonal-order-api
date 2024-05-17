import iPaymentUseCases from "./iPaymentUseCases";
import IPaymentRepository from "../../domain/repositories/iPaymentRepository";
import { Payment } from "../../domain/entities/payment";
import IOrderRepository from "../../domain/repositories/iOrderRepository";
import IHttp from "../../domain/repositories/iHttp";

class PaymentUseCases implements iPaymentUseCases {
    constructor (
        private paymentRepository: IPaymentRepository,
        private orderRepository: IOrderRepository,
        private http: IHttp
    ) {}
    
    async getStatus(id: number): Promise<String | boolean> {
        let payment = await this.paymentRepository.findById(id)
        if (payment) {
            return payment.status
        }

        return false
    }

    async setStatus(id: number, paymentInfo: any): Promise<boolean> {
        let payment = await this.paymentRepository.findById(id)
        if (payment) {
            await this.paymentRepository.update(Object.assign(payment, paymentInfo))
            return true
        }

        return false
    }

    async pay(id: number): Promise<boolean> {
        let payment = await this.paymentRepository.findById(id)
        if (payment) {
            const paymentBody = { order: payment.order }
            const result = await this.http.post(process.env.PAYMENT_URL || 'localhost:8003', paymentBody)
            if (result == 'ok') {
                payment.status = 'paid'
                await this.paymentRepository.update(payment)   
            }
            return true
        } else {
            return false
        }
    }

    async create(paymentInfo: any): Promise<Payment | undefined> {
        paymentInfo.order = await this.orderRepository.findById(paymentInfo.order)
        paymentInfo.date = new Date()
        return await this.paymentRepository.create(paymentInfo)
    }

    async find(): Promise<Payment[] | []> {
        return await this.paymentRepository.find()
    }
}

export default PaymentUseCases