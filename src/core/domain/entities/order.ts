import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm"
import { Client } from "./client"
import { Product } from "./product"

@Entity()
export class Order {
    static ORDER_STATUS_START: number = 0
    static ORDER_STATUS_PAID: number = 1
    static ORDER_STATUS_CONFIRMED: number = 2
    static ORDER_STATUS_DONE: number = 3
    static ORDER_STATUS_CANCELED: number = 4

    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    date: Date

    @Column()
    status: number

    @ManyToOne(() => Client, (client) => client.orders)
    client: Client

    @ManyToMany(() => Product, (product: { orders: any }) => product.orders, { cascade: true })
    @JoinTable()
    products: Product[]

    constructor (date: Date, status: number, client: Client, products: Product[]) {
        this.date = date
        this.status = status
        this.client = client
        this.products = products
    }
}