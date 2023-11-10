import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
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

  @ManyToOne((type) => CartSession, item => item.items)
  cart: CartSession;

  @Column()
  productId: string
}
