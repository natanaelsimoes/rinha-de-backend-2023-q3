import { type MigrationInterface, type QueryRunner } from 'typeorm'

export class CreatePessoas1690938018669 implements MigrationInterface {
  name = 'CreatePessoas1690938018669'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS pg_trgm')
    await queryRunner.query('CREATE TABLE "pessoas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "apelido" character varying(32) NOT NULL, "nome" character varying(100) NOT NULL, "nascimento" date NOT NULL, "stack" text, "search" text NOT NULL, CONSTRAINT "PK_fa8104cfc91dc207880a73a1acd" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE UNIQUE INDEX "IDX_4101067d6dbe19c491f03b8c6f" ON "pessoas" ("apelido") ')
    await queryRunner.query('CREATE INDEX "IDX_GIST_TRGM_PESSOA_SEARCH" ON "pessoas" USING GIST (search gist_trgm_ops)')
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX "public"."IDX_4101067d6dbe19c491f03b8c6f"')
    await queryRunner.query('DROP INDEX "public"."IDX_GIST_TRGM_PESSOA_SEARCH"')
    await queryRunner.query('DROP TABLE "pessoas"')
  }
}
