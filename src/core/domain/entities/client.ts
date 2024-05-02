import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Order } from "./order"

@Entity()
export class Client {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    cpf: string

    @OneToMany(() => Order, (order: { client: any }) => order.client, { cascade: true })
    orders?: Order[]

    constructor (name: string, email: string, cpf: string) {
        this.name = name
        this.email = email
        this.cpf = cpf
    }
}