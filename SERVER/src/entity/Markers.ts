import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Series } from "./Series";

@Entity()
export class Markers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

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
    type => Series,
    series => series.markers
  )
  series: Series;
}