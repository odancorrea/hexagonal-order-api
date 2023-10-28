import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm"
import { Client } from "./client"
import { Product } from "./product"

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    date: Date

    @Column()
    status: string

    @ManyToOne(() => Client, (client) => client.orders)
    client: Client

    @ManyToMany(() => Product, (product: { orders: any }) => product.orders)
    @JoinTable()
    products: Product[]

    constructor (date: Date, status: string, client: Client, products: Product[]) {
        this.date = date
        this.status = status
        this.client = client
        this.products = products
    }
}