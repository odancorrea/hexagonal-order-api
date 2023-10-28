import { Client } from "../../../core/domain/entities/client"
import { Product } from "../../../core/domain/entities/product"
import iDrivenAdapter from "../../driven/iDrivenAdapter"
import { DataSource } from "typeorm"

class PgDataSource implements iDrivenAdapter {    
    appDataSource: any
    
    constructor() {
        this.appDataSource = new DataSource({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "test",
            password: "test",
            database: "test",
            synchronize: true,
            logging: true,
            entities: [Client, Product],
            subscribers: [],
            migrations: [],
        })
    }

    async init() {
        await this.appDataSource.initialize()
        console.log('Db Connected')
    }

    getDataSource() {
        return this.appDataSource
    }
}

export default new PgDataSource()