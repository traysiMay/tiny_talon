import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Markers } from "./Markers";
import { Hunts } from "./Hunts";

export enum SeriesType {
  HUNT = "hunt",
  PERSONAL = "personal",
  GLOBAL = "global",
  UNIFIED = "unified",
}

@Entity()
export class Series {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: "999" })
  lat: string;

  @Column({ default: "999" })
  lng: string;

  @Column()
  description?: string;

  @Column({ default: false })
  init: boolean;

  // personal, hunt, global
  @Column({ type: "enum", enum: SeriesType, default: SeriesType.HUNT })
  type: SeriesType;

  @Column({ nullable: true })
  num_markers: number;

  @Column({ default: false })
  archived: boolean;

  @OneToMany((type) => Hunts, (hunts) => hunts.series)
  hunts: Hunts[];

  @OneToMany((type) => Markers, (markers) => markers.series)
  markers: Markers[];
}
