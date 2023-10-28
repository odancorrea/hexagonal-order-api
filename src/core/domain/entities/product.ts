import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

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

    constructor (name: string, description: string, price: number) {
        this.name = name
        this.description = description
        this.price = price
    }
}