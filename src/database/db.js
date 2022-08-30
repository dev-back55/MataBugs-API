import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config()
const {DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE, DB_DIALECT} = process.env;

export const sequelize = new Sequelize(`${DB_DATABASE}`, `${DB_USER}`, `${DB_PASSWORD}`, {
    host: `${DB_HOST}`,
    dialect: `${DB_DIALECT}`
})