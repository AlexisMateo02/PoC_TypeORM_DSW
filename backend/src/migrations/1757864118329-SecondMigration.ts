import { MigrationInterface, QueryRunner } from "typeorm";

export class SecondMigration1757864118329 implements MigrationInterface {
    name = 'SecondMigration1757864118329'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tag\` DROP COLUMN \`obligatorio_por_ley\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tag\` ADD \`obligatorio_por_ley\` tinyint NULL`);
    }

}
