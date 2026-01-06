import { DataSource } from 'typeorm';
import { Responsible } from '../src/responsible/responsible.entity';
import { Website } from '../src/websites/website.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '12345',
  database: 'website_monitor',
  entities: [Responsible, Website],
  migrations: ['src/migrations/*.ts'],
});

