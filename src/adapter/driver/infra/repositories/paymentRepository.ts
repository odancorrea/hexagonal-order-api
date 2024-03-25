import { Payment } from "../../../../core/domain/entities/payment";
import IPaymentRepository from "../../../../core/domain/repositories/iPaymentRepository";
import dataSource from "../dataSource";

class PaymentRepository implements IPaymentRepository{
    async findById(id: number): Promise<Payment | undefined> {
        const paymentRepository = dataSource.getDataSource().getRepository(Payment)
        return await paymentRepository.findOneBy({ id: id })
    }

    async update(payment: any): Promise<boolean> {
        try {
            const paymentRepository = dataSource.getDataSource().getRepository(Payment)
            await paymentRepository.save(payment)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
}

export default PaymentRepository