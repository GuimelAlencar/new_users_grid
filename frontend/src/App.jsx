import {useState, useEffect} from "react";

import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Form from "./components/Form.jsx"
import Grid from "./components/Grid.jsx"

import "./styles/app.css";


function App() {

  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getUsers = async () => {
    try{
      const response = (await fetch(`http://localhost:8080/users`));
      const json = await response.json();
      setUsers(json.users.sort((a, b) => (a.userName > b.userName ? 1 : -1)));
    } catch(error) {
      toast.error(error);
    };
  };

  useEffect(() => {
    getUsers();
  }, [setUsers]);

  return(
    <>
      <div className="container">
        <h2>Users</h2>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers}/>
        <Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit}/>
      </div>
      <ToastContainer 
        autoClose={3000} 
        position="bottom-left"
        closeOnClick
        theme="light"
        pauseOnHover
        />      
    </>
  );
}

export default App;