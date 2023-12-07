import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(`${process.cwd()}`, `${process.env.NODE_ENV}.env`),
});

const config = {
  NODE_ENV: process.env.NODE_ENV || 'local',
  HOST: process.env.HOST || 'localhost',
  PORT: process.env.PORT || 3000,
  MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/',
  DB_NAME: process.env.DB_NAME || 'tr'
};

export default config;
