import Sequelize from "sequelize";
import {username, password, host} from '../config/config.js'

export const sequelize = new Sequelize('halloffame', `${username}`, `${password}`, {
    host: `${host}`,
    dialect: 'postgres'
})