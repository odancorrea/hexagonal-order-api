import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm"
import { Order } from "./order"

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    price: number

    @Column()
    category: string

    @ManyToMany(() => Order, (order: { products: any }) => order.products)
    orders?: Order[]

    constructor (name: string, description: string, price: number, category: string) {
        this.name = name
        this.description = description
        this.price = price
        this.category = category
    }
}