import { Request, Response } from 'express'
import OrderUseCases from '../../../core/application/useCases/orderUseCases'
import OrderRepository from '../../driver/infra/repositories/orderRepository'

class OrderController {
    async find(req: Request, res: Response) {
        const orderRepository = new OrderRepository()
        const orderUseCase = new OrderUseCases(orderRepository)
        const result = await orderUseCase.find()
        result ? res.status(200).send('ok') : res.status(404).send('not found')
    }

    async checkout(req: Request, res: Response) {
        const orderRepository = new OrderRepository()
        const orderUseCase = new OrderUseCases(orderRepository)
        await orderUseCase.checkout(parseInt(req.params.id))
        res.status(200).send('ok')
    }
}

export default new OrderController()