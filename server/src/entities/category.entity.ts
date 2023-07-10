import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Category {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ unique: true })
    label: string

    @Column({ unique: true })
    imageUrl: string

}