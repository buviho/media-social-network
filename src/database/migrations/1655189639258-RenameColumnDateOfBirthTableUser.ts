import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameColumnDateOfBirthTableUser1655189639258
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE user RENAME COLUMN dateOfBirth TO date_of_birth
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE user RENAME COLUMN date_of_birth TO dateOfBirth
        `);
  }
}
