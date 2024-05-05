import { Sequelize } from 'sequelize'


const sequelize = new Sequelize('postgres', 'user', 'secret', {
    host: 'localhost',
    dialect:"postgres" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  })
//   postgres://user:secret@localhost:5432/postgres
 export const connection =async()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
  }