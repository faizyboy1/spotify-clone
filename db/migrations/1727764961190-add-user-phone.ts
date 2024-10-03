import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserPhone1727764961190 implements MigrationInterface {
    name = 'AddUserPhone1727764961190'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    }

}
