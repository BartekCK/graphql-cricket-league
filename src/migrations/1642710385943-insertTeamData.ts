import { MigrationInterface, QueryRunner } from "typeorm";
import { parse, Parser } from "csv-parse";
import * as fs from "fs";
import * as path from "path";

interface CsvTeam {
  id: string;
  team_name: string;
  team_code: string;
}

export class insertTeamData1642710385943 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const csvStream = fs.createReadStream(
      path.join(__dirname, "../../.db/csv/team.csv"),
      "utf8"
    );

    const parser = parse({
      columns: true,
      cast: (value) => {
        return value === "" ? null : value;
      },
    });

    csvStream.pipe(parser);
    parser.on("data", ({ id, team_name, team_code }: CsvTeam) => {
      queryRunner.query(
        `INSERT INTO team(id, team_name, team_code) VALUES ($1, $2, $3);`,
        [Number(id), team_name, team_code]
      );
    });
    await this.waitForEnd(parser);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM team`);
  }

  private waitForEnd(parser: Parser) {
    return new Promise((resolve) => {
      parser.on("end", () => {
        resolve(true);
      });
    });
  }
}
