import { Request, Response } from 'express'
import PaymentUseCases from '../../../core/application/useCases/paymentUseCases'
import PaymentRepository from '../../driver/infra/repositories/paymentRepository'

class PaymentController {
    async getStatus(req: Request, res: Response) {
        const paymentRepository = new PaymentRepository()
        const paymentUseCase = new PaymentUseCases(paymentRepository)
        const result = await paymentUseCase.getStatus(parseInt(req.params.id))
        result ? res.status(200).send(result) : res.status(404).send('not found')
    }

    async setStatus(req: Request, res: Response) {
        const paymentRepository = new PaymentRepository()
        const paymentUseCase = new PaymentUseCases(paymentRepository)
        await paymentUseCase.setStatus(parseInt(req.params.id), req.body)
        res.status(200).send('ok')
    }
}

export default new PaymentController()