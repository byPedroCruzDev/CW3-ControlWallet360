import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1692809238348 implements MigrationInterface {
    name = 'InitialMigration1692809238348'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "expense" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" integer NOT NULL, "description" character varying NOT NULL, "haveInstallments" boolean NOT NULL, "numMonths" integer NOT NULL, "userId" uuid, CONSTRAINT "PK_edd925b450e13ea36197c9590fc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "like" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid, "postId" uuid, CONSTRAINT "PK_eff3e46d24d416b52a7e0ae4159" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "numLikes" integer NOT NULL, "authorId" uuid, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "aboutMe" character varying, "photo" character varying, "wage" integer, "occupation" character varying, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying NOT NULL, "userId" uuid, "postId" uuid, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_friends_user" ("userId_1" uuid NOT NULL, "userId_2" uuid NOT NULL, CONSTRAINT "PK_f2b5631d91f6b7fda632135932f" PRIMARY KEY ("userId_1", "userId_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_04840fd160b733de706a336013" ON "user_friends_user" ("userId_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_e81f236c989f3fd54836b50a12" ON "user_friends_user" ("userId_2") `);
        await queryRunner.query(`ALTER TABLE "expense" ADD CONSTRAINT "FK_06e076479515578ab1933ab4375" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "FK_e8fb739f08d47955a39850fac23" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "FK_3acf7c55c319c4000e8056c1279" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_c6fb082a3114f35d0cc27c518e0" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_94a85bb16d24033a2afdd5df060" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_friends_user" ADD CONSTRAINT "FK_04840fd160b733de706a3360134" FOREIGN KEY ("userId_1") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_friends_user" ADD CONSTRAINT "FK_e81f236c989f3fd54836b50a12d" FOREIGN KEY ("userId_2") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_friends_user" DROP CONSTRAINT "FK_e81f236c989f3fd54836b50a12d"`);
        await queryRunner.query(`ALTER TABLE "user_friends_user" DROP CONSTRAINT "FK_04840fd160b733de706a3360134"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_94a85bb16d24033a2afdd5df060"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_c6fb082a3114f35d0cc27c518e0"`);
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_3acf7c55c319c4000e8056c1279"`);
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_e8fb739f08d47955a39850fac23"`);
        await queryRunner.query(`ALTER TABLE "expense" DROP CONSTRAINT "FK_06e076479515578ab1933ab4375"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e81f236c989f3fd54836b50a12"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_04840fd160b733de706a336013"`);
        await queryRunner.query(`DROP TABLE "user_friends_user"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP TABLE "like"`);
        await queryRunner.query(`DROP TABLE "expense"`);
    }

}
