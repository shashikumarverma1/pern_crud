import express from "express";
import { Sequelize, DataTypes } from 'sequelize';
import cors from "cors";
import { listAll } from "./clientController/listAll.js";
import { create } from "./clientController/create.js";
import { update } from "./clientController/update.js";
import { remove } from "./clientController/remove.js";
const app = express();

// Router
const router = express.Router();

// Function to create the Sequelize connection
const createConnection = () => {
    return new Sequelize('postgres', 'user', 'secret', {
        host: 'localhost',
        dialect: "postgres"
    });
};

// Function to define the User model
const createUserModel = (sequelize) => {
    return sequelize.define('User', {
        name: {
            type: DataTypes.STRING,
            // allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            // allowNull: false,
            // unique: true
        },
        employId: {
            type: DataTypes.STRING,
         
        },
    });
};
const createBookModel = (sequelize) => {
    return sequelize.define('Book', {
        name: {
            type: DataTypes.STRING,
            // allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            // allowNull: false,
            // unique: true
        },
     
    });
};

let User = null;
let Book = null;

// Function to establish database connection and sync model
const connectAndSync = async () => {
    const sequelize = createConnection();
    try {
        await sequelize.authenticate();
        User = createUserModel(sequelize);
        Book=createBookModel(sequelize);
        await sequelize.sync();
        return { sequelize };
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        throw error;
    }
};

// Start the server after establishing database connection
connectAndSync().then(({ sequelize,  }) => {
   
    router.get(`/user`, async (req , res)=>listAll(User , req , res) )
    router.post(`/user`,async (req , res)=>create(User , req , res))
    router.put(`/user/:id`, async (req , res)=>update(User  , req , res))
    router.delete(`/user/:id`, async (req , res)=>remove(User  , req , res))
    router.get(`/Book`, async (req , res)=>listAll(Book , req , res) )
    router.post(`/Book`,async (req , res)=>create(Book  , req , res))
    router.put(`/Book/:id`, async (req , res)=>update(Book  , req , res))
    router.delete(`/Book/:id`, async (req , res)=>remove(Book  , req , res))
   

    app.use(express.json());
    app.use(cors());
    app.use(router);

    app.listen(6000, () => {
        console.log("Server is running at port 6000");
    });
}).catch(error => {
    console.error('Error establishing database connection:', error);
});

function abc(User){
 try{
 return  [ router.get(`/GetAll${User}`, async (req , res)=>listAll(User , req , res) ),
    router.post(`/Add${User}`,async (req , res)=>create(User , req , res)),
    router.put(`/update${User}/:id`, async (req , res)=>update(User , req , res)),
    router.delete(`/delete${User}/:id`, async (req , res)=>remove(User , req , res)),]
 }catch(err){
    console.log(err)
 }
}
  