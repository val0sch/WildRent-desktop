import { Column, Entity, PrimaryGeneratedColumn, OneToOne,JoinColumn } from "typeorm";
import CartSession from "./cartSession.entity";

@Entity()
export default class Session {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @OneToOne(() => CartSession, cartSession => cartSession.session, {eager:true}) @JoinColumn()
    cartSession: CartSession
}
