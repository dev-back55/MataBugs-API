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
    email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isEmail: {
                msg: "The email must be a valid email"
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [6, 255],
                msg: "The password must have at least 6 characters"
            }
        }
    },
    status: {
      type:DataTypes.STRING,
      dafaultValue:'bronce',
    },
    ranking: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue: "https://drive.google.com/thumbnail?id=1FvgHhPmYNwruvKSjok1dp-ikpKVD2O5z"
    },
    admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    isactive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
  },
  { timestamps: false }
);

export default Player;