import {MigrationInterface, QueryRunner} from "typeorm";

export class createTeamEntity1642676998927 implements MigrationInterface {
    name = 'createTeamEntity1642676998927'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "team" ("id" SERIAL NOT NULL, "team_name" text NOT NULL, "team_code" text NOT NULL, CONSTRAINT "PK_f57d8293406df4af348402e4b74" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "team"`);
    }

}
