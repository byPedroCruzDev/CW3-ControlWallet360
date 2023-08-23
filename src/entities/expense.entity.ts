import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Expense {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  value: number;
  @Column()
  description: string;
  @Column()
  haveInstallments: boolean;
  @Column()
  numMonths: number;

  @ManyToOne(() => User, (user) => user.expenses)
  user: User;
}
