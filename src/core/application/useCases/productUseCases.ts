import { Product } from "../../domain/entities/product";
import IProductRepository from "../../domain/repositories/iProductRepository";
import iProductUseCases from "./iProductUseCases";

class ProductUseCases implements iProductUseCases {
    constructor (private productRepository: IProductRepository) {}

    async create(productInfo: any): Promise<boolean> {
        const product = new Product(productInfo.name, productInfo.description, productInfo.price)
        await this.productRepository.create(product)
        
        return true
    }

    async update(id: number, productInfo: any): Promise<boolean> {
        let product = this.productRepository.find(id)
        if (product) {
            product = { ...productInfo }
            await this.productRepository.update(product)
            return true
        }

        return false
    }

    async delete(id: number): Promise<boolean> {
        let product = this.productRepository.find(id)
        if (product) {
            await this.productRepository.delete(product)
            return true
        }

        return false
    }

    async findByCategory(category: string): Promise<Product[] | []> {
        let products = this.productRepository.findBy('category', category)
        return products
    }
}

export default ProductUseCases