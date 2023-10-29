import { Product } from "../../../../core/domain/entities/product";
import IProductRepository from "../../../../core/domain/repositories/iProductRepository";
import dataSource from "../dataSource";

class ProductRepository implements IProductRepository{
    async create(product: any): Promise<boolean> {
        try {
            const productRepository = dataSource.getDataSource().getRepository(Product)
            await productRepository.save(product)
            return true    
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async update(product: any): Promise<boolean> {
        try {
            const productRepository = dataSource.getDataSource().getRepository(Product)
            await productRepository.save(product)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async delete(product: any): Promise<boolean> {
        try {
            const productRepository = dataSource.getDataSource().getRepository(Product)
            await productRepository.delete(product)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async find(id: number): Promise<Product | []> {
        try {
            const productRepository = dataSource.getDataSource().getRepository(Product)
            return await productRepository.findBy( { id: id } )    
        } catch (error) {
            console.log(error)
            return []
        }
    }

    async findBy(field: string, value: string): Promise<Product[] | []> {
        const query: any = {}
        query[field] = value
        try {
            const productRepository = dataSource.getDataSource().getRepository(Product)
            return await productRepository.findBy(query)
        } catch (error) {
            console.log(error)
            return []
        }
    }
}

export default ProductRepository