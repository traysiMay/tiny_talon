import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique
} from "typeorm";
import { Series } from "./Series";

@Entity()
@Unique(["hash"])
export class Markers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  hash: string;

  @Column()
  cat: string;

  @Column()
  lat: string;

  @Column()
  lng: string;

  @ManyToOne(type => Series)
  series: Series;
}
