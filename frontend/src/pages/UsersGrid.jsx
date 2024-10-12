import { useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { readUsers } from "../services/UsersGrid-services.jsx";

import CreateUserModal from "../components/Modals/CreateUserModal";
import UpdateUserModal from "../components/Modals/UpdateUserModal";
import DeleteUserModal from "../components/Modals/DeleteUserModal";

function UsersGrid() {
   const [users, setUsers] = useState([]);
   const [usersID, setUsersID] = useState("");

   const [showCreateUserModal, setShowCreateUserModal] = useState(false);
   const handleShowCreateModal = () => setShowCreateUserModal(true);
   const handleCloseCreateModal = () => setShowCreateUserModal(false);
   const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);
   const handleShowUpdateModal = () => setShowUpdateUserModal(true);
   const handleCloseUpdateModal = () => setShowUpdateUserModal(false);
   const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
   const handleShowDeleteModal = () => setShowDeleteUserModal(true);
   const handleCloseDeleteModal = () => setShowDeleteUserModal(false);

   

   // Função que atualiza a grid sempre que há alguma alteração na variável de usuários
   useEffect(() => {
      getUsers();
   }, [setUsers]);

   // Função responsável por pegar todos os usuários do banco de dados
   async function getUsers() {
      const toastGetUsers = toast.loading("Getting users...");

      try {
         var response = await readUsers();
         response = response.users.sort((a, b) =>
            a.userName > b.userName ? 1 : -1
         );

         // Parte responsável por atualizar a lista de usuários da página com os dados vindos do getUsers
         //TODO: Ainda tenho ressalvas quanto a atualização do objeto users estar dentro de uma função destinada a pegar dados do db
         setUsers(response);

         return toast.update(toastGetUsers, {
            render: "Users successfuly loaded!",
            type: "success",
            isLoading: false,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
         });
      } catch (error) {
         return toast.update(toastGetUsers, {
            render: `An error has occured: ${error}`,
            type: "error",
            isLoading: false,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
         });
      }
   }

   return (
      <Container>
         <Row>
            <Col>
               <Row>
                  <Col>
                     <p className="h3 mt-4 ">Users_Grid</p>
                  </Col>
               </Row>
               <Row>
                  <Col>
                     <Button
                        variant="primary"
                        size="lg"
                        onClick={handleShowCreateModal}
                     >
                        Add
                     </Button>
                  </Col>
               </Row>
               <Row>
                  <Col>
                     <Table>
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
                           {users.map((item, i) => (
                              <tr key={i}>
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
                                          handleShowUpdateModal;
                                          setUsersID(item.id);
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
                                          handleShowDeleteModal(true);
                                          setUsersID(item.id);
                                       }}
                                    >
                                       <FaTrash />
                                    </Button>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </Table>
                  </Col>
               </Row>
               <CreateUserModal />
               <UpdateUserModal id={usersID} />
               <DeleteUserModal id={usersID} />
               <ToastContainer
                  position="top-center"
                  autoClose={3000}
                  limit={3}
                  closeOnClick
                  pauseOnFocusLoss
                  pauseOnHover
                  theme="dark"
               />
            </Col>
         </Row>
      </Container>
   );
}

export default UsersGrid;

/*
   
   
   const [currentPage, setCurrentPage] = useState(1);
   const recordsPerPage = 5;
   const lastIndex = currentPage * recordsPerPage;
   const firstIndex = lastIndex - recordsPerPage;
   const records = users.slice(firstIndex, lastIndex);
   const numberOfPages = Math.ceil(users.length / recordsPerPage);
   const numbers = [...Array(numberOfPages + 1).keys].slice(1);
   
*/
