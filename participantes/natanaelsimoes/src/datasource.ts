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
  entities: process.env.ENV === 'dev' ? ['src/entity/*.ts'] : ['entity/*.js'],
  migrationsTransactionMode: 'each',
  migrations: ['migration/*.js'],
  cache: {
    type: 'redis',
    options: {
      url: `redis://${process.env.REDIS_HOST ?? 'localhost'}:6379`
    },
    ignoreErrors: true
  },
  poolSize: 200
})
