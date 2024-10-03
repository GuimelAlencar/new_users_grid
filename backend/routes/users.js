import express from "express";
const userRoutes = express.Router();

import { getUser, getUsers, addUser, updateUser, deleteUser } from "../controllers/users.js";

userRoutes.use(express.json());

// Create
userRoutes.post('/users', addUser);

// Read one
userRoutes.get('/users/:id', getUser);
// Read All
userRoutes.get('/users', getUsers);

// Update
userRoutes.put('/users/:id', updateUser);

// Delete
userRoutes.delete('/users/:id', deleteUser);

export default userRoutes;