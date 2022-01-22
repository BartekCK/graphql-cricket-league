import {
  Column,
  Entity, Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Match } from "./Match";
import { Player } from "./Player";
import { Team } from "./Team";

@Entity()
export class PlayerMatch {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: "int", name: "match_id" })
  matchId: number;

  @ManyToOne(() => Match, (match) => match.id)
  @JoinColumn({ name: "match_id" })
  match: Match;

  @Index()
  @Column({ type: "int", name: "player_id" })
  playerId: number;

  @ManyToOne(() => Player, (player) => player.playedMatches)
  @JoinColumn({ name: "player_id" })
  player: Player;

  @Index()
  @Column({ type: "int", name: "team_id" })
  teamId: number;

  @ManyToOne(() => Team, (team) => team.id)
  @JoinColumn({ name: "team_id" })
  team: Team;

  @Column({ type: "boolean", name: "is_keeper" })
  isKeeper: boolean;

  @Column({ type: "boolean", name: "is_captain" })
  isCaptain: boolean;
}
