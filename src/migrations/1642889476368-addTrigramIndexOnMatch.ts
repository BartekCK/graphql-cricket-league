import { MigrationInterface, QueryRunner } from "typeorm";

export class addTrigramIndexOnMatch1642889476368 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION pg_trgm;`);
    await queryRunner.query(
      `CREATE INDEX TRIGRAM_MATCH_SEARCH ON match USING GIST ((match.venue_name || match.city_name || match.host_country) gist_trgm_ops);`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX TRIGRAM_MATCH_SEARCH;`);
    await queryRunner.query(`DROP EXTENSION pg_trgm;`);
  }
}
