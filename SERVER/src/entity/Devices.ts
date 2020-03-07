import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Emails } from "./Emails";

@Entity()
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