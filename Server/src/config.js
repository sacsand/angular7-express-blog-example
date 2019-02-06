import dotenv from 'dotenv';

dotenv.config();

let appDomain = process.env.APP_DOMAIN;

if (!appDomain) {
  appDomain = 'http://localhost';
}

const APP_DOMAIN = appDomain;

const DB_CONFIG = {
  uri: process.env.MONGODB_URI,
  options: {
    useMongoClient: true
  }
};

export { DB_CONFIG, APP_DOMAIN };
