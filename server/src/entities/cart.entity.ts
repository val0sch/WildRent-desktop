import { Column, Entity, PrimaryGeneratedColumn, Check, OneToMany } from "typeorm";
import Item from "./item.entity";

@Entity()
export default class Cart {
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
    
    @OneToMany(() => Item, item => item.cart )
    items: Item[];
}

