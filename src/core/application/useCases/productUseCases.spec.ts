import Http from "../../../adapter/driver/http/http"
import ClientRepository from "../../../adapter/driver/infra/repositories/clientRepository"
import OrderRepository from "../../../adapter/driver/infra/repositories/orderRepository"
import PaymentRepository from "../../../adapter/driver/infra/repositories/paymentRepository"
import ProductRepository from "../../../adapter/driver/infra/repositories/productRepository"
import queue from "../../../adapter/driver/queue/queue"
import OrderUseCases from "./orderUseCases"
import PaymentUseCases from "./paymentUseCases"
import ProductUseCases from "./productUseCases"

describe('ProductUseCases', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })

    it('deve criar um product', async () => {
        //arrange
        const payload = {
            name: 'teste',
            description: 'aaa',
            price: 1,
            category: 'bebida'
        }
        const mock = { 
            id: 1,
            name: 'teste',
            description: 'aaa',
            price: 1,
            category: 'bebida'
        }

        const productRepository = new ProductRepository()
        productRepository.create = jest.fn().mockResolvedValue(mock)
        const productUseCase = new ProductUseCases(productRepository)

        //act
        const product = await productUseCase.create(payload)

        //assert
        expect(product).toEqual(true)
    })

    it('deve buscar todos os products', async () => {
        //arrange
        const mock = [{
            id: 1,
            name: 'teste',
            description: 'aaa',
            price: 1,
            category: 'bebida'
        }]

        const productRepository = new ProductRepository()
        productRepository.findAll = jest.fn().mockResolvedValue(mock)
        const productUseCase = new ProductUseCases(productRepository)

        //act
        const product = await productUseCase.find()

        //assert
        expect(product).toEqual(mock)
    })

    it('deve buscar todos os products pela categoria', async () => {
        //arrange
        const payload = 'bebida'

        const mock = [{
            id: 1,
            name: 'teste',
            description: 'aaa',
            price: 1,
            category: 'bebida'
        }]

        const productRepository = new ProductRepository()
        productRepository.findBy = jest.fn().mockResolvedValue(mock)
        const productUseCase = new ProductUseCases(productRepository)

        //act
        const product = await productUseCase.findByCategory(payload)

        //assert
        expect(product).toEqual(mock)
    })

    it('deve atualizar um produto', async () => {
        //arrange
        const payload1 = 1
        const payload2  ={
            name: 'teste2'
        }

        const mock = {
            id: 1,
            name: 'teste',
            description: 'aaa',
            price: 1,
            category: 'bebida'
        }

        const productRepository = new ProductRepository()
        productRepository.find = jest.fn().mockResolvedValue(mock)
        productRepository.update = jest.fn().mockResolvedValue(true)
        const productUseCase = new ProductUseCases(productRepository)

        //act
        const product = await productUseCase.update(payload1, payload2)

        //assert
        expect(product).toEqual(true)
    })

    it('deve deletar um produto', async () => {
        //arrange
        const payload = 1

        const mock = {
            id: 1,
            name: 'teste',
            description: 'aaa',
            price: 1,
            category: 'bebida'
        }

        const productRepository = new ProductRepository()
        productRepository.find = jest.fn().mockResolvedValue(mock)
        productRepository.delete = jest.fn().mockResolvedValue(true)
        const productUseCase = new ProductUseCases(productRepository)

        //act
        const product = await productUseCase.delete(payload)

        //assert
        expect(product).toEqual(true)
    })
})