import { DataTypes } from 'sequelize';
import { sequelize } from '../database/db.js';

const User = sequelize.define('user', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
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
    admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
    //esto puse por si despues queremos aplicar algo similar al dashboar del PF
    isactive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    image: {
        type: DataTypes.STRING,
    }
})

export default User