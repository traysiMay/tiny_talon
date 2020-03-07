import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique
} from "typeorm";
import { Emails } from "./Emails";

@Entity()
@Unique(["hash"])
export class Devices {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hash: string;

  @ManyToOne(
    type => Emails,
    emails => emails.devices
  )
  email: Emails;
}
