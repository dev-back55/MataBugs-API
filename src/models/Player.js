import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

<<<<<<< HEAD
const Player = sequelize.define('player',{
    nickname:{
        type:DataTypes.STRING,
        allowNull: false,
=======
export const Player = sequelize.define(
  "player",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
>>>>>>> b42d2b56c71351b159f35cddfe7ceae07179fe7b
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("oro", "plata", "bronce"),
      allowNull: false,
      dafaultValue: "bronce",
    },
<<<<<<< HEAD
    avatar:{
        type:DataTypes.STRING
    }
});

export default Player
=======
    ranking: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    avatar: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false }
);
>>>>>>> b42d2b56c71351b159f35cddfe7ceae07179fe7b
