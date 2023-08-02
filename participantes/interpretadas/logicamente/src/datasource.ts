import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST ?? 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'postgres',
  synchronize: false,
  logging: false,
  entities: process.env.ENV === 'dev' ? ['src/entity/*.ts'] : ['dist/entity/*.js'],
  migrationsTransactionMode: 'each',
  migrations: ['dist/migration/*.js']
})
