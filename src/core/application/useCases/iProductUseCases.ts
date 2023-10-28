import { Product } from "../../domain/entities/product";

export default interface iProductUseCases {
    create(productInfo: any): Promise<boolean>,
    update(id: number, productInfo: any): Promise<boolean>,
    delete(id: number): Promise<boolean>,
    findByCategory(category: string): Promise<Product [] | []>
}