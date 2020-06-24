import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Series } from "./Series";
import { Emails } from "./Emails";

@Entity()
@Unique("UQ_RSVP_SERIES", ["email", "series"])
export class Rsvps {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Series)
  @JoinColumn({ name: "series_id" })
  series: Series;
  // optional?
  // or a key for public like 9999
  @ManyToOne((type) => Emails)
  @JoinColumn({ name: "emails_id" })
  email: Emails;
}
