import ClientRepository from "../../../adapter/driver/infra/repositories/clientRepository"
import ClientUseCases from "./clientUseCases"

describe('ClientUseCases', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })

    it('deve criar um cliente', async () => {
        //arrange
        const payload = {
            name: 'teste',
            email: 'email@email.com',
            cpf: '123456789'
        }

        const mock = {
            id:1,
            name: 'teste',
            email: 'email@email.com',
            cpf: '123456789'
        }

        const clientRepository = new ClientRepository()
        clientRepository.create = jest.fn().mockResolvedValue(mock)
        const clientUseCase = new ClientUseCases(clientRepository)

        //act
        const client = await clientUseCase.create(payload)

        //assert
        expect(client).toBe(true)
    })

    it('deve identificar um cliente', async () => {
        //arrange
        const payload = {
            cpf: '123456789'
        }

        const mock = {
            id:1,
            name: 'teste',
            email: 'email@email.com',
            cpf: '123456789'
        }

        const clientRepository = new ClientRepository()
        clientRepository.findBy = jest.fn().mockResolvedValue([mock])
        const clientUseCase = new ClientUseCases(clientRepository)

        //act
        const client = await clientUseCase.identify(payload)

        //assert
        expect(client).toBe(true)
    })

    it('deve buscar os clientes', async () => {
        //arrange
        const mock = [{
            id:1,
            name: 'teste',
            email: 'email@email.com',
            cpf: '123456789'
        }]

        const clientRepository = new ClientRepository()
        clientRepository.find = jest.fn().mockResolvedValue(mock)
        const clientUseCase = new ClientUseCases(clientRepository)

        //act
        const client = await clientUseCase.find()

        //assert
        expect(Array.isArray(client)).toBe(true)
        expect(client.length).toBe(1)
    })
})