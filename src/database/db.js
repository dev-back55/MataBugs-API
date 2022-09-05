import Sequelize from "sequelize";
import { username, password, host, database, dialect } from '../config/config.js'

export const sequelize = new Sequelize(`${database}`, `${username}`, `${password}`, {
    host: `${host}`,
    dialect: `${dialect}`
})