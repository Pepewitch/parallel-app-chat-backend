import dotenv from 'dotenv';
import fs from 'fs';
import { join } from 'path';
import { createConnection } from 'typeorm';

const config = async () => {
  await createConnection();
  /**
   * read local environment from .env file
   */
  if (fs.existsSync(join(__dirname, '../../.env'))) {
    dotenv.config();
  }
};

export default config;
