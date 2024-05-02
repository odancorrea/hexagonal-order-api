import { Request, Response } from 'express'
import OrderUseCases from '../../../core/application/useCases/orderUseCases'
import OrderRepository from '../../driver/infra/repositories/orderRepository'
import queue from '../../driver/queue/queue'
import ClientRepository from '../../driver/infra/repositories/clientRepository'
import ProductRepository from '../../driver/infra/repositories/productRepository'

class OrderController {
    async find(req: Request, res: Response) {
        const orderRepository = new OrderRepository()
        const clientRepository = new ClientRepository()
        const productRepository = new ProductRepository()
        const orderUseCase = new OrderUseCases(orderRepository, queue, clientRepository, productRepository)
        const result = await orderUseCase.find()
        result ? res.status(200).send(result) : res.status(404).send('not found')
    }

    async checkout(req: Request, res: Response) {
        const orderRepository = new OrderRepository()
        const clientRepository = new ClientRepository()
        const productRepository = new ProductRepository()
        const orderUseCase = new OrderUseCases(orderRepository, queue, clientRepository, productRepository)
        await orderUseCase.checkout(parseInt(req.params.id))
        res.status(200).send('ok')
    }

    async setStatus(req: Request, res: Response) {
        const orderRepository = new OrderRepository()
        const clientRepository = new ClientRepository()
        const productRepository = new ProductRepository()
        const orderUseCase = new OrderUseCases(orderRepository, queue, clientRepository, productRepository)
        await orderUseCase.setStatus(parseInt(req.params.id), req.body)
        res.status(200).send('ok')
    }

    async post(req: Request, res: Response) {
        const orderRepository = new OrderRepository()
        const clientRepository = new ClientRepository()
        const productRepository = new ProductRepository()
        const orderUseCase = new OrderUseCases(orderRepository, queue, clientRepository, productRepository)
        await orderUseCase.create(req.body)
        res.status(200).send('ok')
    }
}

export default new OrderController()