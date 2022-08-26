import Sequelize from "sequelize";

export const sequelize = new Sequelize('halloffame', 'postgres', 'Henry2022', {
    host: 'localhost',
    dialect: 'postgres'
})