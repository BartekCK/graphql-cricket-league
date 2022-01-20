import {MigrationInterface, QueryRunner} from "typeorm";

export class createSeasonEntity1642715848114 implements MigrationInterface {
    name = 'createSeasonEntity1642715848114'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "season" ("id" SERIAL NOT NULL, "year" text NOT NULL, "orange_cap_id" integer NOT NULL, "purple_cap_id" integer NOT NULL, "man_of_the_series_id" integer NOT NULL, CONSTRAINT "PK_8ac0d081dbdb7ab02d166bcda9f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "season" ADD CONSTRAINT "FK_ca68b8d973eee3fb26df273d7f2" FOREIGN KEY ("orange_cap_id") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "season" ADD CONSTRAINT "FK_990dff7211ab878c6bcb586cae0" FOREIGN KEY ("purple_cap_id") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "season" ADD CONSTRAINT "FK_8bef3ad3e84c93d357ef8694a53" FOREIGN KEY ("man_of_the_series_id") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "season" DROP CONSTRAINT "FK_8bef3ad3e84c93d357ef8694a53"`);
        await queryRunner.query(`ALTER TABLE "season" DROP CONSTRAINT "FK_990dff7211ab878c6bcb586cae0"`);
        await queryRunner.query(`ALTER TABLE "season" DROP CONSTRAINT "FK_ca68b8d973eee3fb26df273d7f2"`);
        await queryRunner.query(`DROP TABLE "season"`);
    }

}
