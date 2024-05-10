import ClientRepository from "../../../adapter/driver/infra/repositories/clientRepository"
import OrderRepository from "../../../adapter/driver/infra/repositories/orderRepository"
import ProductRepository from "../../../adapter/driver/infra/repositories/productRepository"
import queue from "../../../adapter/driver/queue/queue"
import OrderUseCases from "./orderUseCases"

describe('OrderUseCases', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })

    it('deve buscar as orders', async () => {
        //arrange
        const mock = [{
            id: 1,
            date: new Date(),
            status: 1,
            client: 1,
            products:[1,2,3]
        }]

        const orderRepository = new OrderRepository()
        const clientRepository = new ClientRepository()
        const productRepository = new ProductRepository()
        orderRepository.find = jest.fn().mockResolvedValue(mock)
        const orderUseCase = new OrderUseCases(orderRepository, queue, clientRepository, productRepository)

        //act
        const order = await orderUseCase.find()

        //assert
        expect(Array.isArray(order)).toBe(true)
        expect(order.length).toBe(1)
    })

    it('deve fazer o checkout de uma order', async () => {
        //arrange
        const payload = 1

        const mock = [{
            id: 1,
            date: new Date(),
            status: 1,
            client: 1,
            products:[1,2,3]
        }]

        const orderRepository = new OrderRepository()
        const clientRepository = new ClientRepository()
        const productRepository = new ProductRepository()
        orderRepository.findById = jest.fn().mockResolvedValue(mock)
        queue.sendToQueue = jest.fn().mockResolvedValue(true)
        const orderUseCase = new OrderUseCases(orderRepository, queue, clientRepository, productRepository)

        //act
        const order = await orderUseCase.checkout(payload)

        //assert
        expect(order).toBe(true)
    })

    it('deve colocar um status em uma order', async () => {
        //arrange
        const payload1 = 1
        const payload2 = { status: 2}

        const mock = [{
            id: 1,
            date: new Date(),
            status: 1,
            client: 1,
            products:[1,2,3]
        }]

        const orderRepository = new OrderRepository()
        const clientRepository = new ClientRepository()
        const productRepository = new ProductRepository()
        orderRepository.findById = jest.fn().mockResolvedValue(mock)
        orderRepository.update = jest.fn().mockResolvedValue(true)
        queue.sendToQueue = jest.fn().mockResolvedValue(true)
        const orderUseCase = new OrderUseCases(orderRepository, queue, clientRepository, productRepository)

        //act
        const order = await orderUseCase.setStatus(payload1, payload2)

        //assert
        expect(order).toBe(true)
    })

    it('deve criar uma order', async () => {
        //arrange
        const payload = {}

        const mock = {
            id: 1,
            date: new Date(),
            status: 1,
            client: 1,
            products:[1,2,3]
        }

        const mockProducts = [1]

        const orderRepository = new OrderRepository()
        const clientRepository = new ClientRepository()
        const productRepository = new ProductRepository()
        orderRepository.findById = jest.fn().mockResolvedValue(mock)
        orderRepository.create = jest.fn().mockResolvedValue(mock)
        productRepository.findByIds = jest.fn().mockResolvedValue(mockProducts)
        const orderUseCase = new OrderUseCases(orderRepository, queue, clientRepository, productRepository)

        //act
        const order = await orderUseCase.create(payload)

        //assert
        expect(order).toEqual(mock)
    })
})