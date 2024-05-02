import { Product } from "../entities/product";

export default interface IProductRepository {
    create(product: any): Promise<boolean>,
    update(product: any): Promise<boolean>,
    delete(product: any): Promise<boolean>,
    find(id: number): Promise<Product | false>,
    findBy(key: string, value: string): Promise<Product[] | []>,
    findAll(): Promise<Product[] | []>,
    findByIds(ids: number[]): Promise<Product[] | []>
}