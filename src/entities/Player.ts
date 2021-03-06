import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PlayerMatch } from "./PlayerMatch";

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "date", nullable: true })
  dob?: Date;

  @Column({ type: "text", nullable: true, name: "batting_hand" })
  battingHand?: string;

  @Column({ type: "text", nullable: true, name: "bowling_skill" })
  bowlingSkill?: string;

  @Column({ type: "text" })
  country: string;

  @Column({ type: "boolean", name: "is_umpire" })
  isUmpire: boolean;

  @OneToMany(() => PlayerMatch, (playedMatches) => playedMatches.player)
  playedMatches: PlayerMatch[];
}
