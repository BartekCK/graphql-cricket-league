import {MigrationInterface, QueryRunner} from "typeorm";

export class createPlayerMatchEntity1642861208917 implements MigrationInterface {
    name = 'createPlayerMatchEntity1642861208917'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "player_match" ("id" SERIAL NOT NULL, "match_id" integer NOT NULL, "player_id" integer NOT NULL, "team_id" integer NOT NULL, "is_keeper" boolean NOT NULL, "is_captain" boolean NOT NULL, CONSTRAINT "PK_58afd2c450f166eacbdf982841f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "player_match" ADD CONSTRAINT "FK_93410ddfb98b888792380a20c79" FOREIGN KEY ("match_id") REFERENCES "match"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "player_match" ADD CONSTRAINT "FK_68e98d8ebd6965eef2b2bf8efd4" FOREIGN KEY ("player_id") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "player_match" ADD CONSTRAINT "FK_25bcc80ca65cdbdc52e610b7961" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "player_match" DROP CONSTRAINT "FK_25bcc80ca65cdbdc52e610b7961"`);
        await queryRunner.query(`ALTER TABLE "player_match" DROP CONSTRAINT "FK_68e98d8ebd6965eef2b2bf8efd4"`);
        await queryRunner.query(`ALTER TABLE "player_match" DROP CONSTRAINT "FK_93410ddfb98b888792380a20c79"`);
        await queryRunner.query(`DROP TABLE "player_match"`);
    }

}
