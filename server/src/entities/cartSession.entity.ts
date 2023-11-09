import { Column, Entity, PrimaryGeneratedColumn, OneToOne, Check } from "typeorm";
import Session from "./session.entity";

@Entity()
export default class CartSession {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        type: "varchar",
        length: 50 
    })
    @Check(`state IN ('en cours', 'validée', 'annulée', 'archivée')`)
    state: string; 

    @Column()
    creation_date: Date;   

    @OneToOne(() => Session, session => session.cartSession)
    session: Session;

}

