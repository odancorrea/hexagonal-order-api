import { Client } from "../../../core/domain/entities/client"
import { Order } from "../../../core/domain/entities/order"
import { Payment } from "../../../core/domain/entities/payment"
import { Product } from "../../../core/domain/entities/product"
import iDrivenAdapter from "../../driven/iDrivenAdapter"
import { DataSource } from "typeorm"

class PgDataSource implements iDrivenAdapter {    
    appDataSource: any
    
    constructor() {
        this.appDataSource = new DataSource({
            type: "postgres",
            host: process.env.DATABASE_URI || "terraform-20240315134048471100000001.clcq60c8wuse.sa-east-1.rds.amazonaws.com",
            port: 5432,
            username: process.env.DATABASE_USERNAME || "root",
            password: process.env.DATABASE_PASSWORD || "strong_password",
            database: "lanchonete",
            synchronize: true,
            logging: true,
            entities: [Client, Product, Order, Payment],
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
