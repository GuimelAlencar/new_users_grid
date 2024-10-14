import { useState } from "react";
import { toast } from "react-toastify";
import { Row, Button, Modal, Form } from "react-bootstrap";
import { createUser } from "../../services/UsersGrid-services";

export default function CreateUserModal({ show, handleClose, handleUpdate }) {
   
   const [formData, setFormData] = useState({
      userName: "",
      email: "",
      phone: "",
      birthDate: "",
   });   

   // Função responsável por receber os resultados da alteração do formulário
   function handleChange(element) {
      const { name, value } = element.target;
      setFormData((prevData) => ({
         ...prevData,
         [name]: value,
      }));
   }

   // função responsável por submeter o formulário
   function handleSubmit(event) {
      event.preventDefault();
      try {
         // Criação de usuário
         const response = addUser(formData);

         handleClose();
         handleUpdate();
         return response;
      } catch (error) {
         return console.log(`An error has occured: ${error}`);
      }
   }

   // Criação de um usuário
   async function addUser(newUserData) {
      const toastCreateUser = toast.loading("Creating user...");

      //TODO: Validação

      // Executa os comandos da service para requisição ao backend
      try {
         const response = await createUser(newUserData);

         // Limpando os campos do formulário
         setFormData({
            userName: "",
            email: "",
            phone: "",
            birthDate: "",
         });

         toast.update(toastCreateUser, {
            render: `${response.message}`,
            type: "success",
            isLoading: false,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true
         });
      } catch (error) {
         toast.update(toastCreateUser, {
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
      <Modal
         backdrop="static"
         keyboard={false}
         show={show}
         onHide={handleClose}
      >
         <Modal.Header>
            <Modal.Title>Register new user</Modal.Title>
         </Modal.Header>
         <Form onSubmit={handleSubmit}>
            <Modal.Body>
               <Row className="mb-4">
                  <Form.Group className="mb-3">
                     <Form.Label>UserName</Form.Label>
                     <Form.Control
                        type="text"
                        id="userName"
                        placeholder="userName"
                        defaultValue={formData.userName}
                        onChange={handleChange}
                     />
                     <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                     <Form.Label>Email</Form.Label>
                     <Form.Control
                        type="email"
                        id="email"
                        placeholder="name@example.com"
                        defaultValue={formData.email}
                        onChange={handleChange}
                     />
                     <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                     <Form.Label>phone</Form.Label>
                     <Form.Control
                        type="textarea"
                        id="phone"
                        placeholder="(XX) X XXXX-XXXX"
                        defaultValue={formData.phone}
                        onChange={handleChange}
                     />
                  </Form.Group>
                  <Form.Group className="mb-3">
                     <Form.Label>BirthDate</Form.Label>
                     <Form.Control
                        type="date"
                        id="birthDate"
                        defaultValue={formData.birthDate}
                        onChange={handleChange}
                     />
                  </Form.Group>
               </Row>
            </Modal.Body>
            <Modal.Footer>
               <Button
                  variant="danger"
                  onClick={() => {
                     setFormData({
                        userName: "",
                        email: "",
                        phone: "",
                        birthDate: "",
                     });
                     handleClose();
                  }}
               >
                  Cancel
               </Button>
               <Button variant="success" type="submit">
                  Add
               </Button>
            </Modal.Footer>
         </Form>
      </Modal>
   );
}
