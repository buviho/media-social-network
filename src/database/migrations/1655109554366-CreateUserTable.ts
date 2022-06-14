import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1655109554366 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE user (
                id varchar(50) NOT NULL,
                email varchar(100) NOT NULL,
                name varchar(100) NOT NULL,
                gender ENUM('MALE', 'FEMALE', 'OTHER') NOT NULL,
                dateOfBirth date NULL,
                created_at timestamp NOT NULL DEFAULT now(),
                updated_at timestamp NOT NULL DEFAULT now()
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE user`);
  }
}
