import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Emails } from "./Emails";

@Entity()
export class Markers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hash: string;

  @Column({ default: false })
  found: boolean;

  @Column()
  cat: string;

  @Column()
  lat: string;

  @Column()
  lng: string;

  @ManyToOne(
    type => Emails,
    emails => emails.devices
  )
  email: Emails;
}
