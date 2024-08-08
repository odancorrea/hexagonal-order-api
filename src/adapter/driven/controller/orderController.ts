import { Request, Response } from 'express'
import OrderUseCases from '../../../core/application/useCases/orderUseCases'
import OrderRepository from '../../driver/infra/repositories/orderRepository'
import queue from '../../driver/queue/queue'
import ClientRepository from '../../driver/infra/repositories/clientRepository'
import ProductRepository from '../../driver/infra/repositories/productRepository'
import { Order } from '../../../core/domain/entities/order'

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

    async cancel(queueObject: any) {
        const parsedQueueObject = JSON.parse(queueObject.content.toString())
        const orderRepository = new OrderRepository()
        const clientRepository = new ClientRepository()
        const productRepository = new ProductRepository()
        const orderUseCase = new OrderUseCases(orderRepository, queue, clientRepository, productRepository)
        await orderUseCase.setStatus(parseInt(parsedQueueObject.id), { status: Order.ORDER_STATUS_CANCELED })
    }

    async confirm(queueObject: any) {
        const parsedQueueObject = JSON.parse(queueObject.content.toString())
        console.log(parsedQueueObject)
        const orderRepository = new OrderRepository()
        const clientRepository = new ClientRepository()
        const productRepository = new ProductRepository()
        const orderUseCase = new OrderUseCases(orderRepository, queue, clientRepository, productRepository)
        await orderUseCase.setStatus(parseInt(parsedQueueObject.id), { status: Order.ORDER_STATUS_CONFIRMED })
    }
}

export default new OrderController()