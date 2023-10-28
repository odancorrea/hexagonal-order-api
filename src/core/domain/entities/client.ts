import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

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

    constructor (name: string, email: string, cpf: string) {
        this.name = name
        this.email = email
        this.cpf = cpf
    }
}