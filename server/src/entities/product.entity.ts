import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
} from "typeorm";
import Category from "./category.entity";
import Image from "./image.entity";

@Entity()
export default class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  isAvailable: boolean;

  @Column()
  size: string;

  @Column()
  stock: number;

  @ManyToOne((type) => Category, { onDelete: "SET NULL", eager: true })
  @JoinColumn()
  category: Category;

  @OneToMany(() => Image, (item) => item.product)
  images: Image[];
}
