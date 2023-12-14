import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import User from "./user.entity";

@Entity()
export default class DetailsUser {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  birthday: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  firstname: string;

  @Column({ nullable: true })
  lastname: string;

  @OneToOne(() => User, (user) => user.detailsUser)
  user: User;
}
