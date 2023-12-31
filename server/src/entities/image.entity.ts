import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import Product from "./product.entity";

@Entity()
export default class Image {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  isMain: boolean;

  @Column()
  name: string;

  @ManyToOne(() => Product, (product) => product.images)
  product: Product;
}
