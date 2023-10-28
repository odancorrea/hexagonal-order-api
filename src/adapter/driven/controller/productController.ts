import { Request, Response } from 'express'
import ProductUseCases from '../../../core/application/useCases/productUseCases'
import ProductRepository from '../../driver/infra/repositories/productRepository'

class ProductController {
    async create(req: Request, res: Response) {
        const productRepository = new ProductRepository()
        const productUseCase = new ProductUseCases(productRepository)
        await productUseCase.create(req.body)
        res.status(201).send('created')
    }

    async update(req: Request, res: Response) {
        const productRepository = new ProductRepository()
        const productUseCase = new ProductUseCases(productRepository)
        await productUseCase.update(parseInt(req.params.id), req.body)
        res.status(200).send('ok')
    }

    async delete(req: Request, res: Response) {
        const productRepository = new ProductRepository()
        const productUseCase = new ProductUseCases(productRepository)
        await productUseCase.delete(parseInt(req.params.id))
        res.status(200).send('ok')
    }

    async findByCategory(req: Request, res: Response) {
        const productRepository = new ProductRepository()
        const productUseCase = new ProductUseCases(productRepository)
        const result = await productUseCase.findByCategory(req.params.category)
        result ? res.status(200).send('ok') : res.status(404).send('not found')
    }
}

export default new ProductController()