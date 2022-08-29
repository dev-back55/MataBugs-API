import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

const Player = sequelize.define(
  "player",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type:DataTypes.STRING,
      dafaultValue:'bronce',
      allowNull: false,
    },
    ranking: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    avatar: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false }
);

export default Player;