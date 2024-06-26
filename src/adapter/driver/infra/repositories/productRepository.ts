import { In } from "typeorm";
import { Product } from "../../../../core/domain/entities/product";
import IProductRepository from "../../../../core/domain/repositories/iProductRepository";
import dataSource from "../dataSource";

class ProductRepository implements IProductRepository{
    async create(product: any): Promise<boolean> {
        const productRepository = dataSource.getDataSource().getRepository(Product)
        await productRepository.save(product)
        return true
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

    async find(id: number): Promise<Product | false> {
        try {
            const productRepository = dataSource.getDataSource().getRepository(Product)
            return await productRepository.findOneBy( { id: id } )
            return false    
        } catch (error) {
            console.log(error)
            return false
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

    async findAll(): Promise<Product[] | []> {
        try {
            const productRepository = dataSource.getDataSource().getRepository(Product)
            return await productRepository.find()
        } catch (error) {
            console.log(error)
            return []
        }
    }

    async findByIds(ids: number[]): Promise<Product[] | []> {
        try {
            const productRepository = dataSource.getDataSource().getRepository(Product)
            return await productRepository.find( { where: { id: In(ids) }} )
        } catch (error) {
            console.log(error)
            return []
        }
    }
}

export default ProductRepository