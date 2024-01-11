import { Column, Entity, PrimaryGeneratedColumn, Check, OneToMany } from "typeorm";
import Item from "./item.entity";

@Entity()
// @Check(`state IN ('en cours', 'validée', 'annulée', 'archivée')`)
export default class Cart {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Column({
        type: "varchar",
        length: 50 
    })
    
    @Column()
    state: string; 

    @Column()
    creation_date: Date;   
    
    @OneToMany(() => Item, item => item.cart )
    @Column({ nullable: true, type: "simple-json" })
    items: Item[];
}

