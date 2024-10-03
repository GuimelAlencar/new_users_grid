import db from "../db/models/index.js";

// Create
export const addUser = async (req, res) => {
    const {
        userName,
        email,
        phone,
        birthDate,

    } = req.body;

    try {
        const user = await db.users.create({
            userName,
            email,
            phone,
            birthDate,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        console.log('New user created: ', user);
        return res.json({ 
            message: 'New user successfully created.'
        });
    } catch (error){
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
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
    if(user){
        return res.json({
            error: false,
            user,
        });
    } else{
        return res.status(400).json({
            error: true,
            message: "Content not found."
        });
    };
};

// Read all
export const getUsers = async (req, res) => {
    
    const users = await db.users.findAll();
    console.log(users);
    if(users){
        return res.json({
            error: false,
            users,
        });
    } else{
        return res.status(400).json({
            error: true,
            message: "Content not found.",
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
        const updatedUser = await db.users.update({
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

        console.log('User updated: ', updatedUser);
        return res.json({ 
            message: 'User successfully updated.'
        });
    } catch (error){
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
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
                message: 'User successfully deleted.'
            });
        } else {
            return res.status(400).json({
                error: true,
                message: "Content not found."
            });
        }
    } catch (error){
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    };
};