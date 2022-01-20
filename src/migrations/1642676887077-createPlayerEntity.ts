import {MigrationInterface, QueryRunner} from "typeorm";

export class createPlayerEntity1642676887077 implements MigrationInterface {
    name = 'createPlayerEntity1642676887077'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "player" ("id" SERIAL NOT NULL, "name" text NOT NULL, "dob" date, "batting_hand" text, "bowling_skill" text, "country" text NOT NULL, "is_umpire" boolean NOT NULL, CONSTRAINT "PK_65edadc946a7faf4b638d5e8885" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "player"`);
    }

}
