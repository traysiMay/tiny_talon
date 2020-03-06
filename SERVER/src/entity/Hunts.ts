import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Series } from "./Series";
import { Emails } from "./Emails";

@Entity()
export class Hunts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  completed: boolean;

  @Column("simple-array")
  marker_map: string[];

  @ManyToOne(
    type => Series,
    series => series.hunts
  )
  series: Series;
  // optional?
  @ManyToOne(
    type => Emails,
    emails => emails.hunts
  )
  emails: Emails;
}
