import db from "../db/models/index.js";

// Create
export const addUser = async (req, res) => {
    const {
        userName,
        email,
        phone,
        birthDate
    } = req.body;

    try {
        await db.users.create({
            userName,
            email,
            phone,
            birthDate,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        return res.json({ 
            message: "New user successfully created."
        });
    } catch (error){
        return res.status(500).json({
            message: "An error has occurred: ",
            error: `${error}` 
        });
    };
};

// Read
export const getUser = async (req, res) => {
    const user = await db.users.findOne({
        attributes: [
            'username', 
            'email', 
            'phone',
            'birthDate'
        ],
        where: {
            id: req.params.id,
        },
    });
    try {
        if(user){
            return res.json({
                message: "User succesfully loaded.",
                user,
            });
        } else{
            return res.status(400).json({
                message: "User not found",
            })
        }
    } catch(error) {
        return res.status(500).json({
            message: "Something went wrong: ",
            error: `${error}`,          
        });
    }
};

// Read all
export const getUsers = async (req, res) => {
    const users = await db.users.findAll();
    try {
        return res.json({
            message: "Users successfuly loaded!",
            users,
        });
    } catch(error) {
        return res.status(500).json({            
            message: "Something went wrong:",
            error: `${error}`
        });
    }
};

// Update
export const updateUser = async (req, res) => {
    
    const userID = req.params.id;
    const {
        userName,
        email,
        phone,
        birthDate
    } = req.body;

    try {
        await db.users.update({
            userName,
            email,
            phone,
            birthDate
        },
        {
            where: {
                id: userID,
            }
        });
        return res.json({ 
            message: "User successfully updated.",
        });
    } catch (error){
        return res.status(500).json({ 
            message: "Something went wrong: ",
            error: `${error}`, 
        });
    };
};

// Delete
export const deleteUser = async (req, res) => {

    const userID = req.params.id;

    try {
        if(userID){
            const deletedUser = await db.users.destroy({
                where: {
                    id: userID,
                }   
            });
            console.log('User deleted: ', deletedUser);
            return res.json({ 
                message: "User successfully deleted.",
            });
        } else {
            return res.status(400).json({
                message: "Content not found.",
            });
        }
    } catch (error){
        return res.status(500).json({ 
            message: "Something went wrong: ",
            error: `${error}`,
        });
    };
};