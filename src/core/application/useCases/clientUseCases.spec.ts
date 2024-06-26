import ClientRepository from "../../../adapter/driver/infra/repositories/clientRepository"
import ClientUseCases from "./clientUseCases"

describe('ClientUseCases', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })

    it('deve criar um cliente', async () => {
        // Dado que temos um payload para insercao do cliente no banco de dados, quando a chamada para criacao ser executada, entao deve-se ter sucesso na criacao
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
        // 
        const client = await clientUseCase.create(payload)

        //assert
        expect(client).toBe(true)
    })

    it('deve identificar um cliente', async () => {
        // Dado que e informado um cpf para identificacao, quando a chamada para a identificacao ser executada, entao deve-se ter sucesso na identificacao
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
        // Dado que chamamos a rota de busca de clientes na api, quando a chamada para a busca ser executada, entao deve-se retornar um array com 1 cliente
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