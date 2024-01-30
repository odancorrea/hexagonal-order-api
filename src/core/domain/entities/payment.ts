import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { Order } from "./order"

@Entity()
export class Payment {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    date: Date

    @Column()
    status: string

    @OneToOne(() => Order)
    @JoinColumn()
    order: Order

    constructor (date: Date, status: string, order: Order) {
        this.date = date
        this.status = status
        this.order = order
    }
}