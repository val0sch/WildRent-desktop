import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ unique: true })
    email: string
    
    @Column()
    password: string

    @Column({ default: false})
    isAdmin: boolean 

}