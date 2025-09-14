import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1757862916015 implements MigrationInterface {
    name = 'FirstMigration1757862916015'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tag\` ADD \`obligatorio_por_ley\` tinyint NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tag\` DROP COLUMN \`obligatorio_por_ley\``);
    }

}
