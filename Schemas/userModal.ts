import { DataTypes } from "sequelize";

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