import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1758138656471 implements MigrationInterface {
    name = 'FirstMigration1758138656471'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tag\` ADD \`es_obligatorio\` tinyint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tag\` DROP COLUMN \`es_obligatorio\``);
    }

}
