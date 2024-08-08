import { Client } from "../entities/client";

export default interface IClientRepository {
    create(client: any): Promise<boolean>,
    findBy(key: string, value: string): Promise<Client[] | []>,
    find(): Promise<Client[] | []>,
    delete(client: any): Promise<boolean>,
}