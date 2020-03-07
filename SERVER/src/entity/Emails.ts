import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Unique,
  Index
} from "typeorm";
import { Devices } from "./Devices";
import { Hunts } from "./Hunts";

@Entity()
@Unique(["email"])
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

  @OneToMany(
    type => Hunts,
    hunts => hunts.emails
  )
  hunts: Hunts[];
}
