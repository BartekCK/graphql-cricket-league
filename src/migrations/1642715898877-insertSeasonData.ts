import { MigrationInterface, QueryRunner } from "typeorm";
import { parse, Parser } from "csv-parse";
import * as fs from "fs";
import * as path from "path";

interface CsvSeason {
  id: string;
  year: string;
  orange_cap_id: string;
  purple_cap_id: string;
  man_of_the_series_id: string;
}

export class insertSeasonData1642715898877 implements MigrationInterface {
  private waitForEnd(parser: Parser) {
    return new Promise((resolve) => {
      parser.on("end", () => {
        resolve(true);
      });
    });
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    const csvStream = fs.createReadStream(
      path.join(__dirname, "../../.db/csv/season.csv"),
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
        year,
        orange_cap_id,
        purple_cap_id,
        man_of_the_series_id,
      }: CsvSeason) => {
        queryRunner.query(
          `INSERT INTO season(id, year, orange_cap_id, purple_cap_id, man_of_the_series_id) VALUES ($1, $2, $3, $4, $5);`,
          [Number(id), year, orange_cap_id, purple_cap_id, man_of_the_series_id]
        );
      }
    );
    await this.waitForEnd(parser);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM season`);
  }
}
