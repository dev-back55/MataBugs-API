import { DataTypes } from 'sequelize';
import { sequelize } from '../database/db.js';

const Player = sequelize.define('player',{
    nickname:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    status:{
        type:DataTypes.ENUM('oro','plata','bronce'),
        allowNull:false,
        dafaultValue:'bronce'
    },
    ranking:{
        type:DataTypes.INTEGER
    },
    avatar:{
        type:DataTypes.STRING
    }
});
//funciona
export default Player