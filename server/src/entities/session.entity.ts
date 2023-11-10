import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,

} from "typeorm";
import CartSession from "./cartSession.entity";


@Entity()
export default class Session {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({nullable: true})
  userId?: string;

  
  @OneToOne(() => CartSession, {nullable: true})
  @JoinColumn()
  cart?: CartSession;
}
