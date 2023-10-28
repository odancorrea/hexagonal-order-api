import { Request, Response } from 'express'
import ClientUseCases from '../../../core/application/useCases/clientUseCases'
import ClientRepository from '../../driver/infra/repositories/clientRepository'

class ClientController {
    async create(req: Request, res: Response) {
        const clientRepository = new ClientRepository()
        const clientUseCase = new ClientUseCases(clientRepository)
        await clientUseCase.create(req.body)
        res.status(201).send('created')
    }

    async identify(req: Request, res: Response) {
        const clientRepository = new ClientRepository()
        const clientUseCase = new ClientUseCases(clientRepository)
        const result = await clientUseCase.identify(req.body)
        result ? res.status(200).send('ok') : res.status(404).send('not found')
    }
}

export default new ClientController()