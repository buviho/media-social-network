import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnPasswordTableUser1655181922291
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE user ADD COLUMN password varchar(30) NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE user DROP COLUMN password
        `);
  }
}
