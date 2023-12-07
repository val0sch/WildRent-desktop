import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,

} from "typeorm";
import Cart from "./cart.entity";


@Entity()
export default class Session {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({nullable: true})
  userId?: string;

  
  @OneToOne(() => Cart, {nullable: true})
  @JoinColumn()
  cart?: Cart;
}
