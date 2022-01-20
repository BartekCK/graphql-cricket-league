import { MigrationInterface, QueryRunner } from "typeorm";
import * as fs from "fs";
import * as path from "path";
import { parse, Parser } from "csv-parse";

interface CsvPlayer {
  id: string;
  name: string;
  dob: string;
  batting_hand: string;
  bowling_skill: string;
  country: string;
  is_umpire: string;
}

export class insertPlayerData1642705714517 implements MigrationInterface {
  private waitForEnd(parser: Parser) {
    return new Promise((resolve) => {
      parser.on("end", () => {
        resolve(true);
      });
    });
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    const csvStream = fs.createReadStream(
      path.join(__dirname, "../../.db/csv/player.csv"),
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
        id,
        name,
        dob,
        batting_hand,
        bowling_skill,
        country,
        is_umpire,
      }: CsvPlayer) => {
        queryRunner.query(
          `INSERT INTO player(id, name, dob, batting_hand, bowling_skill, country, is_umpire) VALUES ($1, $2, $3, $4, $5, $6, $7);`,
          [
            Number(id),
            name,
            dob,
            batting_hand,
            bowling_skill,
            country,
            is_umpire,
          ]
        );
      }
    );
    await this.waitForEnd(parser);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM player`);
  }
}