import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Markers } from "./Markers";
import { Hunts } from "./Hunts";

@Entity()
export class Series {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description?: string;

  // personal, hunt, global
  @Column()
  cat: string;

  @Column({ nullable: true })
  num_markers: number;

  @OneToMany(
    type => Hunts,
    hunts => hunts.series
  )
  hunts: Hunts[];

  @OneToMany(
    type => Markers,
    markers => markers.series
  )
  markers: Markers[];
}
