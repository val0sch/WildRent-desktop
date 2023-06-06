import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import Category from "./category.entity";
import Item from "./item.entity";

@Entity()
export default class Product {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string
    
    @Column()
    price: number

    @Column()
    description: string

    @Column()
    isAvailable: boolean 

    @Column()
    size: string

    @Column()
    stock: number

    @ManyToOne(type => Category) 
    category: Category

    @OneToOne(() => Item, item => item.product)
    item: Item;

}