import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import Cart from "./cart.entity";
import Product from "./product.entity";

@Entity()
export default class Item {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    quantity: number
    
    @Column()
    start_rent_date: Date

    @Column()
    due_rent_date: Date

    @Column()
    isFavorite: boolean 

    @ManyToOne(type => Cart) 
    cart: Cart

    @OneToOne(() => Product, product => product.item) @JoinColumn()
    product: Product

}