import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

export const Player = sequelize.define(
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
      type: DataTypes.ENUM("oro", "plata", "bronce"),
      allowNull: false,
      dafaultValue: "bronce",
    },
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
