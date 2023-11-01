import { Client } from "../../domain/entities/client";
import IClientRepository from "../../domain/repositories/iClientRepository";
import iClientUseCases from "./iClientUseCases";

class ClientUseCases implements iClientUseCases {
    constructor (private clientRepository: IClientRepository) {}

    async create(clientInfo: any): Promise<boolean> {
        const client = new Client(clientInfo.name, clientInfo.email, clientInfo.cpf)
        await this.clientRepository.create(client)
        
        return true
    }

    async identify(clientInfo: any): Promise<boolean> {
        const result = await this.clientRepository.findBy('cpf', clientInfo.cpf)
        return result.length > 0
    }
}

export default ClientUseCases