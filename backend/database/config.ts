import { createConnection } from 'mysql';
import { config } from 'dotenv';
config();

export default createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  port: process.env.PORT ? parseInt(process.env.PORT) : undefined,
  database: process.env.DATABASE
});
