import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import CartSession from "./cartSession.entity";
import User from "./user.entity";

@Entity()
export default class Session {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({nullable: false})
  userId?: string;
}
