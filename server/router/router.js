import express from "express";
 export const router = express.Router();
import { listAll } from "../clientController/listAll";


export const GetAllUsers = async (User , req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updateUser = async (req, res) => {
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

export const deleteUser = async (req, res) => {
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
export const AddUser=async (req, res) =>{
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


export const apiRouter=(Modal)=>{
    router.get("/GetAllUsers", (req , res)=>listAll(Modal , req , res));

  router.post("/AddUser",AddUser);

router.put("/updateUser/:id", updateUser);

router.delete("/deleteUser/:id", deleteUser);
}

