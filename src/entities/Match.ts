import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Team } from "./Team";
import { Player } from "./Player";
import { Season } from "./Season";

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "date", name: "match_date" })
  matchDate: Date;

  /* */

  @Column({ type: "int", name: "team_id" })
  teamId: number;

  @ManyToOne(() => Team, { lazy: true })
  @JoinColumn({ name: "team_id" })
  team: Promise<Team>;

  /* */

  @Column({ type: "int", name: "opponent_team_id" })
  opponentTeamId: number;

  @ManyToOne(() => Team, { lazy: true })
  @JoinColumn({ name: "opponent_team_id" })
  opponentTeam: Promise<Team>;

  /* */

  @Column({ type: "int", name: "season_id" })
  seasonId: number;

  @ManyToOne(() => Season)
  @JoinColumn({ name: "season_id" })
  season: Season;

  /* */

  @Column({ type: "text", name: "venue_name" })
  venueName: string;

  /* */

  @Column({ type: "int", name: "toss_winner_id" })
  tossWinnerId: number;

  @ManyToOne(() => Team, { lazy: true })
  @JoinColumn({ name: "toss_winner_id" })
  tossWinner: Promise<Team>;

  /* */

  @Column({ type: "text", name: "toss_decision" })
  tossDecision: string;

  @Column({ type: "boolean", name: "is_super_over" })
  isSuperOver: boolean;

  @Column({ type: "boolean", name: "is_result" })
  isResult: boolean;

  @Column({ type: "boolean", name: "is_duck_worth_lewis" })
  isDuckWorthLewis: boolean;

  @Column({ type: "text", name: "win_type" })
  winType: string;

  /* */

  @Column({ type: "int", name: "won_by_player_id", nullable: true })
  wonByPlayerId?: number;

  @ManyToOne(() => Player)
  @JoinColumn({ name: "won_by_player_id" })
  wonByPlayer?: Player;

  /* */

  @Column({ type: "int", name: "team_winner_id", nullable: true })
  teamWinnerId?: number;

  @ManyToOne(() => Team)
  @JoinColumn({ name: "team_winner_id" })
  teamWinner?: Team;

  /* */

  @Column({ type: "int", name: "man_of_the_match_id", nullable: true })
  manOfTheMatchId?: number;

  @ManyToOne(() => Player)
  @JoinColumn({ name: "man_of_the_match_id" })
  manOfTheMatch?: Player;

  /* */

  @Column({ type: "int", name: "first_umpire_id" })
  firstUmpireId: number;

  @ManyToOne(() => Player, { lazy: true })
  @JoinColumn({ name: "first_umpire_id" })
  firstUmpire: Promise<Player>;

  /* */

  @Column({ type: "int", name: "second_umpire_id" })
  secondUmpireId: number;

  @ManyToOne(() => Player, { lazy: true })
  @JoinColumn({ name: "second_umpire_id" })
  secondUmpire: Promise<Player>;

  /* */

  @Column({ type: "text", name: "city_name" })
  cityName: string;

  @Column({ type: "text", name: "host_country" })
  hostCountry: string;
}
