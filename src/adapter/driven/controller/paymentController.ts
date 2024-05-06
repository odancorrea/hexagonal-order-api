import { Request, Response } from 'express'
import PaymentUseCases from '../../../core/application/useCases/paymentUseCases'
import PaymentRepository from '../../driver/infra/repositories/paymentRepository'
import OrderRepository from '../../driver/infra/repositories/orderRepository'
import Http from '../../driver/http/http'

class PaymentController {
    async getStatus(req: Request, res: Response) {
        const paymentRepository = new PaymentRepository()
        const orderRepository = new OrderRepository()
        const http = new Http()
        const paymentUseCase = new PaymentUseCases(paymentRepository, orderRepository, http)
        const result = await paymentUseCase.getStatus(parseInt(req.params.id))
        result ? res.status(200).send(result) : res.status(404).send('not found')
    }

    async setStatus(req: Request, res: Response) {
        const paymentRepository = new PaymentRepository()
        const orderRepository = new OrderRepository()
        const http = new Http()
        const paymentUseCase = new PaymentUseCases(paymentRepository, orderRepository, http)
        await paymentUseCase.setStatus(parseInt(req.params.id), req.body)
        res.status(200).send('ok')
    }

    async pay(req: Request, res: Response) {
        const paymentRepository = new PaymentRepository()
        const orderRepository = new OrderRepository()
        const http = new Http()
        const paymentUseCase = new PaymentUseCases(paymentRepository, orderRepository, http)
        await paymentUseCase.pay(parseInt(req.params.id))
        res.status(200).send('ok')
    }

    async create(req: Request, res: Response) {
        const paymentRepository = new PaymentRepository()
        const orderRepository = new OrderRepository()
        const http = new Http()
        const paymentUseCase = new PaymentUseCases(paymentRepository, orderRepository, http)
        await paymentUseCase.create(req.body)
        res.status(200).send('ok')
    }

    async find(req: Request, res: Response) {
        const paymentRepository = new PaymentRepository()
        const orderRepository = new OrderRepository()
        const http = new Http()
        const paymentUseCase = new PaymentUseCases(paymentRepository, orderRepository, http)
        const payments = await paymentUseCase.find()
        res.status(200).send(payments)
    }
}

export default new PaymentController()