import {MigrationInterface, QueryRunner} from "typeorm";

export class createMatchEntity1642718912225 implements MigrationInterface {
    name = 'createMatchEntity1642718912225'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "match" ("id" SERIAL NOT NULL, "match_date" date NOT NULL, "team_id" integer NOT NULL, "opponent_team_id" integer NOT NULL, "season_id" integer NOT NULL, "venue_name" text NOT NULL, "toss_winner_id" integer NOT NULL, "toss_decision" text NOT NULL, "is_super_over" boolean NOT NULL, "is_result" boolean NOT NULL, "is_duck_worth_lewis" boolean NOT NULL, "win_type" text NOT NULL, "won_by_player_id" integer, "team_winner_id" integer, "man_of_the_match_id" integer, "first_umpire_id" integer NOT NULL, "second_umpire_id" integer NOT NULL, "city_name" text NOT NULL, "host_country" text NOT NULL, CONSTRAINT "PK_92b6c3a6631dd5b24a67c69f69d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_be0adf0634e99e9ef4420fec9ae" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_badc63e1c5208ea575ac6720193" FOREIGN KEY ("opponent_team_id") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_0ed285402e2bd86860ac6a09b56" FOREIGN KEY ("season_id") REFERENCES "season"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_cacdd9b2efee427b2918e443b28" FOREIGN KEY ("toss_winner_id") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_829624b7bd35be38ee3dbad52a0" FOREIGN KEY ("won_by_player_id") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_d19c438d11b896a04ca74107987" FOREIGN KEY ("team_winner_id") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_2e3a96ed2720f6896d61014f9f6" FOREIGN KEY ("man_of_the_match_id") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_770ca992e63490f4765b6a234f5" FOREIGN KEY ("first_umpire_id") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_2ecf41659f7e30efb41df6c3913" FOREIGN KEY ("second_umpire_id") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_2ecf41659f7e30efb41df6c3913"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_770ca992e63490f4765b6a234f5"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_2e3a96ed2720f6896d61014f9f6"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_d19c438d11b896a04ca74107987"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_829624b7bd35be38ee3dbad52a0"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_cacdd9b2efee427b2918e443b28"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_0ed285402e2bd86860ac6a09b56"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_badc63e1c5208ea575ac6720193"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_be0adf0634e99e9ef4420fec9ae"`);
        await queryRunner.query(`DROP TABLE "match"`);
    }

}
