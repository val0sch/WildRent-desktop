import { Column, Entity, PrimaryGeneratedColumn, OneToOne, Check, OneToMany } from "typeorm";
import Session from "./session.entity";
import Item from "./item.entity";

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
    
    @OneToMany(() => Item, item => item.cart.id )
    items: Item[];

    @OneToOne(() => Session)
    session: Session;

}

