import { Client } from "../../../core/domain/entities/client"
import { Order } from "../../../core/domain/entities/order"
import { Product } from "../../../core/domain/entities/product"
import iDrivenAdapter from "../../driven/iDrivenAdapter"
import { DataSource } from "typeorm"

class PgDataSource implements iDrivenAdapter {    
    appDataSource: any
    
    constructor() {
        this.appDataSource = new DataSource({
            type: "postgres",
            host: process.env.DATABASE_URI,
            port: 5432,
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: "lanchonete",
            synchronize: true,
            logging: true,
            entities: [Client, Product, Order],
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