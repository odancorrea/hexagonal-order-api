export default interface IClientRepository {
    create(client: any): Promise<boolean>,
    findBy(key: string, value: string): Promise<boolean>
}