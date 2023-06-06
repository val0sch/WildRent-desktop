import User from "./user.entity";
import Item from "./item.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum CartState {
    EN_COURS = "en cours",
    VALIDEE = "validée",
    ANNULEE = "annulée",
    ARCHIVE = "archivée",
}

@Entity()
export default class Cart {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ 
        type: "enum",
        enum: CartState,
        default: CartState.EN_COURS,
    })
    state:  CartState

    @Column()
    creation_date: Date

    @ManyToOne(type => User) 
    user: User

}
