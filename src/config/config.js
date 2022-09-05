import dotenv from 'dotenv';
import path  from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

export const username = process.env.DB_USER
export const password = process.env.DB_PASSWORD
export const host = process.env.DB_HOST
export const database = process.env.DB_DATABASE
export const dialect = process.env.DB_DIALECT