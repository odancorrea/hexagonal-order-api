import Http from "../../../adapter/driver/http/http"
import OrderRepository from "../../../adapter/driver/infra/repositories/orderRepository"
import PaymentRepository from "../../../adapter/driver/infra/repositories/paymentRepository"
import PaymentUseCases from "./paymentUseCases"

describe('PaymentUseCases', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })

    it('deve buscar o status de um payment', async () => {
        //arrange
        const payload = 1
        const mock = { 
            status: 'paid'
         }

        const paymentRepository = new PaymentRepository()
        const orderRepository = new OrderRepository()
        const http = new Http()
        paymentRepository.findById = jest.fn().mockResolvedValue(mock)
        const paymentUseCase = new PaymentUseCases(paymentRepository, orderRepository, http)

        //act
        const order = await paymentUseCase.getStatus(payload)

        //assert
        expect(order).toBe('paid')
    })

    it('deve atualizar o status de um payment', async () => {
        //arrange
        const payload1 = 1
        const payload2 = { status: 'paid' }
        const mock = { 
            id: 1,
            date: new Date(),
            status: 'new',
            order: 1
         }

        const paymentRepository = new PaymentRepository()
        const orderRepository = new OrderRepository()
        const http = new Http()
        paymentRepository.findById = jest.fn().mockResolvedValue(mock)
        paymentRepository.update = jest.fn().mockResolvedValue(true)
        const paymentUseCase = new PaymentUseCases(paymentRepository, orderRepository, http)

        //act
        const order = await paymentUseCase.setStatus(payload1, payload2)

        //assert
        expect(order).toBe(true)
    })

    it('deve pagar um payment', async () => {
        //arrange
        const payload = 1
        const mock = { 
            id: 1,
            date: new Date(),
            status: 'new',
            order: 1
         }

        const paymentRepository = new PaymentRepository()
        const orderRepository = new OrderRepository()
        const http = new Http()
        paymentRepository.findById = jest.fn().mockResolvedValue(mock)
        http.post = jest.fn().mockResolvedValue('ok')
        paymentRepository.update = jest.fn().mockResolvedValue(mock)
        const paymentUseCase = new PaymentUseCases(paymentRepository, orderRepository, http)

        //act
        const order = await paymentUseCase.pay(payload)

        //assert
        expect(order).toBe(true)
    })

    it('deve criar um payment', async () => {
        //arrange
        const payload = {
            date: new Date(),
            status: 'new',
            order: 1
        }
        const mock = { 
            id: 1,
            date: new Date(),
            status: 'new',
            order: 1
         }

        const paymentRepository = new PaymentRepository()
        const orderRepository = new OrderRepository()
        const http = new Http()
        orderRepository.findById = jest.fn().mockResolvedValue(mock)
        paymentRepository.create = jest.fn().mockResolvedValue(mock)
        const paymentUseCase = new PaymentUseCases(paymentRepository, orderRepository, http)

        //act
        const order = await paymentUseCase.create(payload)

        //assert
        expect(order).toEqual(mock)
    })

    it('deve buscar todos os payments', async () => {
        //arrange
        const mock = [{ 
            id: 1,
            date: new Date(),
            status: 'new',
            order: 1
         }]

        const paymentRepository = new PaymentRepository()
        const orderRepository = new OrderRepository()
        const http = new Http()
        paymentRepository.find = jest.fn().mockResolvedValue(mock)
        const paymentUseCase = new PaymentUseCases(paymentRepository, orderRepository, http)

        //act
        const order = await paymentUseCase.find()

        //assert
        expect(order).toEqual(mock)
    })
})