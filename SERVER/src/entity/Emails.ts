import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Devices } from "./Devices";

@Entity()
export class Emails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @OneToMany(
    type => Devices,
    devices => devices.email
  )
  devices: Devices[];
}
