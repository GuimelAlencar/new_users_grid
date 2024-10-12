import { useState } from "react";
import { toast } from "react-toastify";
import { Row, Button, Modal, Form } from "react-bootstrap";
import { updateUser, readUser } from "../../services/UsersGrid-services";

export default function UpdateUserModal(id, { show, handleClose }) {
   
   //TODO: Maneira do form receber o ID do usuário

   const user = readUser(id);

   const [formData, setFormData] = useState({
      email: user.email,
      phone: user.phone,
      birthDate: user.birthDate,
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
      const toastSubmit = toast.loading("Updating user...");
      try {
         // Criação de usuário
         const response = editUser(id, formData);

         return toast.success(`Success: ${response}`, {
            id: toastSubmit,
         });
      } catch (error) {
         return toast.error(`An error has occured: ${error}`, {
            id: toastSubmit,
         });
      }
   }

   // Criação de um usuário
   async function editUser(newUserData) {
      //TODO: Validação

      const toastCreateUser = toast.loading("Updating user...");

      // Executa os comandos da service para requisição ao backend
      try {
         const response = await updateUser(newUserData.id, newUserData);

         // Limpando os campos do formulário
         setFormData({
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
                  Edit
               </Button>
            </Modal.Footer>
         </Form>
      </Modal>
   );
}