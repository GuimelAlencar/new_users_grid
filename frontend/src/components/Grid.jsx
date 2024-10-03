import React from "react";

import {FaTrash, FaEdit} from "react-icons/fa";
import {toast} from "react-toastify";

import "../styles/main.css";
import "../styles/grid.css";

const Grid = ({users, setUsers, setOnEdit}) => {

    const handleEdit = (item) => {
        setOnEdit(item);
    }

    const handleDelete = async (id) => {
        await fetch(`http://localhost:8080/users/${id}`, 
            { method: 'DELETE' })
            .then(({data}) => {
                const newUsers = users.filter((user) => user.id !== id);
                setUsers(newUsers);
                toast.success(data);
            })
            .catch(({data}) => toast.error(data));
            
        setOnEdit(null);
    }

    console.log(users);
    return(
        <table className="table">
            <thead>
                <tr>
                    <th className="th">Name</th>
                    <th className="th">Email</th>
                    <th className="th" data-only-web="true">Phone</th>
                    <th className="th"></th>
                    <th className="th"></th>
                </tr>
            </thead>
            <tbody>
                {users.map((item, i) => (
                    <tr key={i}>
                        <td className="td" style={{ width: "30%" }}>{item.userName}</td>
                        <td className="td" style={{ width: "30%" }}>{item.email}</td>
                        <td className="td" data-only-web="true" style={{ width: "20%" }}>{item.phone}</td>
                        <td className="td td-center" style={{ width: "5%" }}>
                            <FaEdit onClick={() => handleEdit(item)} />
                        </td>
                        <td className="td td-center" style={{ width: "5%" }}>
                            <FaTrash onClick={() => handleDelete(item.id)} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Grid;