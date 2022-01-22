import {MigrationInterface, QueryRunner} from "typeorm";

export class addIndexesOnFewForeignKeys1642886879727 implements MigrationInterface {
    name = 'addIndexesOnFewForeignKeys1642886879727'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_93410ddfb98b888792380a20c7" ON "player_match" ("match_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_68e98d8ebd6965eef2b2bf8efd" ON "player_match" ("player_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_25bcc80ca65cdbdc52e610b796" ON "player_match" ("team_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_0ed285402e2bd86860ac6a09b5" ON "match" ("season_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_0ed285402e2bd86860ac6a09b5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_25bcc80ca65cdbdc52e610b796"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_68e98d8ebd6965eef2b2bf8efd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_93410ddfb98b888792380a20c7"`);
    }

}
