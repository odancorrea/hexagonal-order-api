import { Request, Response } from 'express'
import PaymentUseCases from '../../../core/application/useCases/paymentUseCases'
import PaymentRepository from '../../driver/infra/repositories/paymentRepository'
import OrderRepository from '../../driver/infra/repositories/orderRepository'

class PaymentController {
    async getStatus(req: Request, res: Response) {
        const paymentRepository = new PaymentRepository()
        const orderRepository = new OrderRepository()
        const paymentUseCase = new PaymentUseCases(paymentRepository, orderRepository)
        const result = await paymentUseCase.getStatus(parseInt(req.params.id))
        result ? res.status(200).send(result) : res.status(404).send('not found')
    }

    async setStatus(req: Request, res: Response) {
        const paymentRepository = new PaymentRepository()
        const orderRepository = new OrderRepository()
        const paymentUseCase = new PaymentUseCases(paymentRepository, orderRepository)
        await paymentUseCase.setStatus(parseInt(req.params.id), req.body)
        res.status(200).send('ok')
    }

    async pay(req: Request, res: Response) {
        const paymentRepository = new PaymentRepository()
        const orderRepository = new OrderRepository()
        const paymentUseCase = new PaymentUseCases(paymentRepository, orderRepository)
        await paymentUseCase.pay(parseInt(req.params.id))
        res.status(200).send('ok')
    }

    async create(req: Request, res: Response) {
        const paymentRepository = new PaymentRepository()
        const orderRepository = new OrderRepository()
        const paymentUseCase = new PaymentUseCases(paymentRepository, orderRepository)
        await paymentUseCase.create(req.body)
        res.status(200).send('ok')
    }

    async find(req: Request, res: Response) {
        const paymentRepository = new PaymentRepository()
        const orderRepository = new OrderRepository()
        const paymentUseCase = new PaymentUseCases(paymentRepository, orderRepository)
        const payments = await paymentUseCase.find()
        res.status(200).send(payments)
    }
}

export default new PaymentController()