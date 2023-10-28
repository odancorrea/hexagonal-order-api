export default interface IProductRepository {
    create(product: any): Promise<boolean>,
    update(product: any): Promise<boolean>,
    delete(product: any): Promise<boolean>,
    find(id: number): Promise<boolean>,
    findBy(key: string, value: string): Promise<boolean>
}