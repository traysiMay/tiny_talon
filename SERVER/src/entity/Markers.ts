import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique
} from "typeorm";
import { Series } from "./Series";

// RIDDLE TYPE WOULD MAKE MORE SENSE
// IF THERE IS A CLUE ENTITY
// THAT CAN EITHER HAVE RIDDLES OR MARKERS
// i.e. a riddle does not need a location in theory

enum ClueType {
  QR = "qr",
  INPUT = "input",
  RIDDLE = "riddle"
}

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

  @Column({
    type: "simple-array",
    enum: ClueType,
    default: `${ClueType.QR},${ClueType.INPUT}`
  })
  type: ClueType[];

  @Column()
  lat: string;

  @Column()
  lng: string;

  @ManyToOne(type => Series)
  series: Series;
}
