import { Sequelize } from 'sequelize'
import { createUserModel } from '../Schemas/userModal.js';

export const createConnection = () => {
  return new Sequelize('postgres', 'user', 'secret', {
      host: 'localhost',
      dialect: "postgres"
  });
};
//   postgres://user:secret@localhost:5432/postgres
export const connectAndSync = async (User) => {
  const sequelize = createConnection();
  try {
      await sequelize.authenticate();
      User = createUserModel(sequelize);
      await sequelize.sync();
      return { sequelize, User };
  } catch (error) {
      console.error('Unable to connect to the database:', error);
      throw error;
  }
};