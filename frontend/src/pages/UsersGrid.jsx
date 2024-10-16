import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, Row, Col, Button, Table, Card } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { readUsers } from "../services/UsersGrid-services.jsx";
import CreateUserModal from "../components/CreateUserModal";
import UpdateUserModal from "../components/UpdateUserModal";
import DeleteUserModal from "../components/DeleteUserModal";

function UsersGrid() {
   const [users, setUsers] = useState([]);
   const [selectedUserId, setSelectedUserId] = useState(null);

   const [showCreateUserModal, setShowCreateUserModal] = useState(false);
   const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);
   const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);

   useEffect(() => {
      getUsers();
   }, []);

   async function getUsers() {
      const toastGetUsers = toast.loading("Requesting users...");
      try {
         const response = await readUsers();
         const users = response.users.sort((a, b) =>
            a.userName > b.userName ? 1 : -1
         );
         const message = response.message;
         setUsers(users);
         toast.update(toastGetUsers, {
            render: `${message}`,
            type: "success",
            isLoading: false,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
         });
      } catch (error) {
         toast.update(toastGetUsers, {
            render: `${response.message + error}`,
            type: "error",
            isLoading: false,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
         });
      }
   }

   return (
      <Container>
         <Row className="gx-0">
            <Col className="p-3">               
               <Row className="mt-4">
                  <Col className="mb-1">
                     <div className="d-flex justify-content-end">
                        <Button
                           variant="primary"
                           size="lg"
                           onClick={() => setShowCreateUserModal(true)}
                        >
                           Add new User
                        </Button>
                     </div>
                  </Col>
               </Row>
               <Row className="m-0 mt-1">
                  <Card className="p-3 my-3 shadow">
                     <Card.Header>
                        <Card.Title>Users</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                           Users Grid
                        </Card.Subtitle>
                     </Card.Header>
                     <Table responsive striped bordered hover variant="dark">
                        <thead>
                           <tr>
                              <th className="th">Name</th>
                              <th className="th">Email</th>
                              <th className="th" data-only-web="true">
                                 Phone
                              </th>
                              <th className="th"></th>
                              <th className="th"></th>
                           </tr>
                        </thead>
                        <tbody>
                           {users.map((item) => (
                              <tr key={item.id}>
                                 <td className="td" style={{ width: "30%" }}>
                                    {item.userName}
                                 </td>
                                 <td className="td" style={{ width: "30%" }}>
                                    {item.email}
                                 </td>
                                 <td
                                    className="td"
                                    data-only-web="true"
                                    style={{ width: "20%" }}
                                 >
                                    {item.phone}
                                 </td>
                                 <td
                                    className="td td-center"
                                    style={{ width: "5%" }}
                                 >
                                    <Button
                                       variant="info"
                                       size="sm"
                                       onClick={() => {
                                          setSelectedUserId(item.id);
                                          setShowUpdateUserModal(true);
                                       }}
                                    >
                                       <FaEdit />
                                    </Button>
                                 </td>
                                 <td
                                    className="td td-center"
                                    style={{ width: "5%" }}
                                 >
                                    <Button
                                       variant="danger"
                                       size="sm"
                                       onClick={() => {
                                          setSelectedUserId(item.id);
                                          setShowDeleteUserModal(true);
                                       }}
                                    >
                                       <FaTrash />
                                    </Button>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </Table>
                  </Card>
               </Row>
               <CreateUserModal
                  show={showCreateUserModal}
                  handleClose={() => setShowCreateUserModal(false)}
                  handleUpdate={getUsers}
               />
               <UpdateUserModal
                  id={selectedUserId}
                  show={showUpdateUserModal}
                  handleClose={() => setShowUpdateUserModal(false)}
                  handleUpdate={getUsers}
               />
               <DeleteUserModal
                  id={selectedUserId}
                  show={showDeleteUserModal}
                  handleClose={() => setShowDeleteUserModal(false)}
                  handleUpdate={getUsers}
               />
               <ToastContainer
                  position="top-center"
                  autoClose={2000}
                  limit={3}
                  closeOnClick
                  pauseOnFocusLoss
                  theme="dark"
               />
            </Col>
         </Row>
      </Container>
   );
}

export default UsersGrid;
