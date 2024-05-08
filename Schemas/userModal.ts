import { Sequelize, DataTypes } from 'sequelize';
import { createConnection } from '../pg/pg.js';

 const sequelize = createConnection();

 export const createUserModel = (sequelize :any) => {
    return sequelize.define('User', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            // unique: true
        },
        employId: {
            type: DataTypes.STRING,
            allowNull: false,
            // unique: true
        },
    });
};