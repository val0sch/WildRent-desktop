import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from "typeorm";
import Product from "./product.entity";
import CartSession from "./cartSession.entity";


@Entity()
export default class Item  {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  quantity: number;

  @Column()
  start_rent_date: Date;

  @Column()
  due_rent_date: Date;

  @Column()
  isFavorite: boolean;

  @ManyToOne((type) => CartSession)
  cart: CartSession;

  @Column()
  productId: string
}
