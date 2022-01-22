import { MigrationInterface, QueryRunner } from "typeorm";
import { parse, Parser } from "csv-parse";
import * as fs from "fs";
import * as path from "path";

interface CsvPlayerMatch {
  match_id: string;
  player_id: string;
  team_id: string;
  is_keeper: string;
  is_captain: string;
}

export class insertPlayerMatchData1642861335002 implements MigrationInterface {
  private waitForEnd(parser: Parser) {
    return new Promise((resolve) => {
      parser.on("end", () => {
        resolve(true);
      });
    });
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    const csvStream = fs.createReadStream(
      path.join(__dirname, "../../.db/csv/player_match.csv"),
      "utf8"
    );

    const parser = parse({
      columns: true,
      cast: (value) => {
        return value === "" ? null : value;
      },
    });

    csvStream.pipe(parser);
    parser.on(
      "data",
      ({
        match_id,
        player_id,
        team_id,
        is_keeper,
         is_captain,
      }: CsvPlayerMatch) => {
        queryRunner.query(
          `INSERT INTO player_match(match_id, player_id, team_id, is_keeper, is_captain) VALUES ($1, $2, $3, $4, $5);`,
          [
            Number(match_id),
            Number(player_id),
            Number(team_id),
            is_keeper,
            is_captain,
          ]
        );
      }
    );
    await this.waitForEnd(parser);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM player_match`);
  }
}
