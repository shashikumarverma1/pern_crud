import express from "express";
import { Sequelize, DataTypes } from 'sequelize';
import cors from "cors";

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

let User = null;

// Function to establish database connection and sync model
const connectAndSync = async () => {
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

// Start the server after establishing database connection
connectAndSync().then(({ sequelize, User }) => {
    router.get("/GetAllUsers", GetAllUsers);

    router.post("/AddUser",AddUser);

    router.put("/updateUser/:id", updateUser);
    
    router.delete("/deleteUser/:id", deleteUser);

    app.use(express.json());
    app.use(cors());
    app.use(router);

    app.listen(6000, () => {
        console.log("Server is running at port 6000");
    });
}).catch(error => {
    console.error('Error establishing database connection:', error);
});

const GetAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const updateUser = async (req, res) => {
    const id = req.params.id;
    try {
        let re = await User.findOne({ where: { id: id } });
        // console.log(re, "reeeeee");
        // return
        const [updated] = await User.update(req.body, { where: { id: id } });
        if (updated) {
            res.json({ message: "User updated successfully" });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findOne({ where: { id: id } });
        console.log(user , "user")
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        
        await user.destroy();
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
const AddUser=async (req, res) =>{
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}