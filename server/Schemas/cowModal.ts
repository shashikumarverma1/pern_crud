import { DataTypes } from "sequelize";

export const cowModel = async(sequelize) => {
    console.log("cow")
    return
    return sequelize.define('Cow', {
        name: {
            type: DataTypes.STRING,
            // allowNull: false
        },
        // description: {
        //     type: DataTypes.STRING,
        //     // allowNull: false,
        //     // unique: true
        // },
     
    });
};