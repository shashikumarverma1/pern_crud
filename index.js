import express from "express";
import { Sequelize, DataTypes, where } from 'sequelize';
import cors from "cors"
const app = express();

// router
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
            unique: true
        },
        employId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
    });
};
let User=null;
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
    // Define routes inside this callback
    router.get("/user", GetAllUsers);
    router.post("/adduser", async function(req, res){
        const {name , email , employId }=req.body
        try{
        //  const res=await User.findOne({
        //     where:{
        //         employId:employId
        //     }
        //  })
        let res= User.create(req.body)
        console.log(name ,email,employId , "adeed suces")
        //  if(!res){
          
        //  }
        //  console.log(user , "got")
         // console.log(req, res)
     
        }catch(err){
         console.log(err)
        }
     });

     router.put("/update:employId", async function(req, res){
        // const id=req.params.employId
    //    const updateUser=await User.update(req.body , {where:{'employId':id}})
     console.log(req.body , 'updateUser')
      
    });
    app.use(express.json())
    app.use(cors())
    // Use the router in the application
    app.use(router);

    // Start the server
    app.listen(6000, () => {
        console.log("Server is running at port 6000");
    });
}).catch(error => {
    console.error('Error establishing database connection:', error);
});

const GetAllUsers =async(req, res)=>{
   try{
    const user=await User.findAll()
    console.log(user , "got")
    // console.log(req, res)

   }catch(err){
    console.log(err)
   }
}

const updateUser=async(req, res)=>{
    const id=req.params.employId
   const updateUser=await User.update(req.body , {where:{'employId':id}})
 console.log(updateUser , 'updateUser')
  
}