import React, {useState, useEffect} from "react";

import { toast } from "react-toastify";

import "../styles/main.css"
import "../styles/form.css";

const Form = ({ getUsers, onEdit, setOnEdit }) => {

    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        phone: "",
        birthDate: ""
    });

    useEffect(() => {
        if (onEdit) {
            setFormData({
                userName: onEdit.userName,
                email: onEdit.email,
                phone: onEdit.phone,
                birthDate: onEdit.birthDate
            });
        }
    }, [onEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.userName ||
            !formData.email ||
            !formData.phone ||
            !formData.birthDate
        ) {
            return toast.warn("Filling in all fields is mandatory!");
        }

        const userData = {
            userName: formData.userName,
            email: formData.email,
            phone: formData.phone,
            birthDate: formData.birthDate
        };

        try {
            const url = onEdit 
                ? `http://localhost:8080/users/${onEdit.id}`
                : `http://localhost:8080/users`;
            
            const method = onEdit ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            toast.success(data.message || "Operation successful");

            setFormData({
                userName: "",
                email: "",
                phone: "",
                birthDate: ""
            });

            setOnEdit(null);
            getUsers();
        } catch (error) {
            console.error('Error:', error);
            toast.error("An error occurred. Please try again.");
        }
    };
    
    return (
        <form onSubmit={handleSubmit} className="form-container">
            <div className="input-area">
                <label htmlFor="userName">Name</label>
                <input 
                    name="userName" 
                    id="userName" 
                    className="input"
                    value={formData.userName}
                    onChange={handleChange}
                />
            </div>

            <div className="input-area">
                <label htmlFor="email">Email</label>
                <input 
                    name="email" 
                    type="email" 
                    id="email" 
                    className="input"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>

            <div className="input-area">
                <label htmlFor="phone">Phone</label>
                <input 
                    name="phone" 
                    id="phone" 
                    className="input"
                    value={formData.phone}
                    onChange={handleChange}
                />
            </div>
            
            <div className="input-area">
                <label htmlFor="birthDate">Birth Date</label>
                <input 
                    name="birthDate" 
                    type="date" 
                    id="birthDate" 
                    className="input"
                    value={formData.birthDate}
                    onChange={handleChange}
                />
            </div>
            
            <button type="submit" className="button">Save</button>
        </form>
    );
};

export default Form;