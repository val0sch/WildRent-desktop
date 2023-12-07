import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import Cart from "./cart.entity";


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

  @ManyToOne((type) => Cart, item => item.items)
  cart: Cart;

  @Column()
  productId: string
}
