import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeTypeColumnPasswordTableUser1655192877840
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE user MODIFY password varchar(100)
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE user MODIFY password varchar(30)
        `);
  }
}
