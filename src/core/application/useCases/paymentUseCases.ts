import iPaymentUseCases from "./iPaymentUseCases";
import IPaymentRepository from "../../domain/repositories/iPaymentRepository";

class PaymentUseCases implements iPaymentUseCases {
    constructor (private paymentRepository: IPaymentRepository) {}
    
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
}

export default PaymentUseCases