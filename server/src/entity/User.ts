import { ICreateUser } from "./../interfaces/user.interface";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class User extends BaseEntity {
  constructor(creadentials: ICreateUser) {
    super();
    if (!creadentials) return;
    const { email, username, password } = creadentials;
    this.email = email;
    this.password = password;
    this.username = username;
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ nullable: false, select: false })
  password?: string;

  @Column({ default: false, nullable: false })
  verified: boolean;
}
