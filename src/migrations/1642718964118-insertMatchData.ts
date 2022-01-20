import { MigrationInterface, QueryRunner } from "typeorm";
import { parse, Parser } from "csv-parse";
import * as fs from "fs";
import * as path from "path";
import { format, parse as parseDate } from "date-fns";

interface CsvMatch {
  id: string;
  match_date: string;
  team_id: string;
  opponent_team_id: string;
  season_id: string;
  venue_name: string;
  toss_winner_id: string;
  toss_decision: string;
  is_super_over: string;
  is_result: string;
  is_duck_worth_lewis: string;
  win_type: string;
  won_by_player_id: string;
  team_winner_id: string;
  man_of_the_match_id: string;
  first_umpire_id: string;
  second_umpire_id: string;
  city_name: string;
  host_country: string;
}

export class insertMatchData1642718964118 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const csvStream = fs.createReadStream(
      path.join(__dirname, "../../.db/csv/match.csv"),
      "utf8"
    );

    const parser = parse({
      columns: true,
      cast: (value) => {
        return value === "" ? null : value;
      },
    });

    csvStream.pipe(parser);
    parser.on("data", (csvMatch: CsvMatch) => {
      queryRunner.query(
        `INSERT INTO match VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19);`,
        [
          Number(csvMatch.id),
          format(
            parseDate(csvMatch.match_date, "dd-MMM-yy", new Date()),
            "yyyy-MM-dd"
          ),
          Number(csvMatch.team_id),
          Number(csvMatch.opponent_team_id),
          Number(csvMatch.season_id),
          csvMatch.venue_name,
          Number(csvMatch.toss_winner_id),
          csvMatch.toss_decision,
          csvMatch.is_super_over,
          csvMatch.is_result,
          csvMatch.is_duck_worth_lewis,
          csvMatch.win_type,
          this.convertStringToNumber(csvMatch.won_by_player_id),
          this.convertStringToNumber(csvMatch.team_winner_id),
          this.convertStringToNumber(csvMatch.man_of_the_match_id),
          Number(csvMatch.first_umpire_id),
          Number(csvMatch.second_umpire_id),
          csvMatch.city_name,
          csvMatch.host_country,
        ]
      );
    });
    await this.waitForEnd(parser);
  }

  private convertStringToNumber(value?: string): number | null {
    return value === "NULL" || !value ? null : Number(value);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM match`);
  }

  private waitForEnd(parser: Parser) {
    return new Promise((resolve) => {
      parser.on("end", () => {
        resolve(true);
      });
    });
  }
}
