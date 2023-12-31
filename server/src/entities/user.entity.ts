import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from "typeorm";
import DetailsUser from "./detailsUser.entity";

@Entity()
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  isAdmin: boolean;

  @OneToOne(() => DetailsUser, (detailsUser) => detailsUser.user, {
    eager: true,
  })
  @JoinColumn()
  detailsUser: DetailsUser;
}
