import { Client } from "../../../../core/domain/entities/client";
import IClientRepository from "../../../../core/domain/repositories/iClientRepository";
import dataSource from "../dataSource";

class ClientRepository implements IClientRepository{
    async create(client: any): Promise<boolean> {
        try {
            const clientRepository = dataSource.getDataSource().getRepository(Client)
            await clientRepository.save(client)
            return true    
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async findBy(key: string, value: string): Promise<Client[] | []> {
        try {
            const query: any = {}
            
            query[key] = value
            const client = new Client('Joao', 'joao@joao.com', '123456789')
            const clientRepository = dataSource.getDataSource().getRepository(Client)
            return await clientRepository.findBy( query )    
        } catch (error) {
            console.log(error)
            return []
        }
    }
}

export default ClientRepository