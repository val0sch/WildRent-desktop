import {
  Column,
  Entity,
  PrimaryGeneratedColumn,

} from "typeorm";


@Entity()
export default class Session {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({nullable: false})
  userId?: string;
}
