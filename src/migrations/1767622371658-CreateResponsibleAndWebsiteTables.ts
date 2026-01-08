import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateResponsibleAndWebsiteTables1700000000000
  implements MigrationInterface
{
  name = 'CreateResponsibleAndWebsiteTables1700000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE responsible (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL
      );
    `);

    await queryRunner.query(`
      CREATE TABLE website (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        url VARCHAR(500) NOT NULL,
        "isonline" BOOLEAN DEFAULT true,
        "lastCheck" TIMESTAMP,
        "responsibleid" INTEGER,
        CONSTRAINT fk_responsible
          FOREIGN KEY ("responsibleid")
          REFERENCES responsible(id)
          ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE website;`);
    await queryRunner.query(`DROP TABLE responsible;`);
  }
}
