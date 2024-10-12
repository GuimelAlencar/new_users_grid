import { useState } from "react";
import { toast } from "react-toastify";
import { Row, Button, Modal, Form } from "react-bootstrap";
import { createUser } from "../../services/UsersGrid-services";

export default function CreateUserModal({ show, handleClose }) {
   
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

         return response;
      } catch (error) {
         return console.log(`An error has occured: ${error}`);
      }
   }

   // Criação de um usuário
   async function addUser(newUserData) {
      //TODO: Validação

      const toastCreateUser = toast.loading("Creating user...");

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

         return toast.success(`Success: ${response}`, {
            id: toastCreateUser,
         });
      } catch (error) {
         return toast.error(`An error has occured: ${error}`, {
            id: toastCreateUser,
         });
      }
   }

   //TODO: A grid precisa ser atualizada

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
                        type="textarea"
                        id="userName"
                        defaultValue={formData.userName}
                        onChange={handleChange}
                     />
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
                     handleClose = true;
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
