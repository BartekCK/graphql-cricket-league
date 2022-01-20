import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Player } from "./Player";

@Entity()
export class Season {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  year: string;

  /* */
  @Column({ type: "int", name: "orange_cap_id" })
  orangeCapId: number;

  @ManyToOne(() => Player)
  @JoinColumn({ name: "orange_cap_id" })
  orangeCap: Player;

  /* */

  @Column({ type: "int", name: "purple_cap_id" })
  purpleCapId: number;

  @ManyToOne(() => Player)
  @JoinColumn({ name: "purple_cap_id" })
  purpleCap: Player;

  /* */

  @Column({ type: "int", name: "man_of_the_series_id" })
  manOfTheSeriesId: number;

  @ManyToOne(() => Player)
  @JoinColumn({ name: "man_of_the_series_id" })
  manOfTheSeries: Player;

}
