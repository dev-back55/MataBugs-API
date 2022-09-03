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
      defaultValue: "https://static1.abc.es/media/play/2020/09/29/avatar-kE4H--620x349@abc.jpeg",

    },
    admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    //esto puse por si despues queremos aplicar algo similar al dashboar del PF
    isactive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
  },
  { timestamps: false }
);

export default Player;