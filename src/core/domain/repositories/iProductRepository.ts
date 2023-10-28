import { Product } from "../entities/product";

export default interface IProductRepository {
    create(product: any): Promise<boolean>,
    update(product: any): Promise<boolean>,
    delete(product: any): Promise<boolean>,
    find(id: number): Promise<Product | []>,
    findBy(key: string, value: string): Promise<Product[] | []>
}