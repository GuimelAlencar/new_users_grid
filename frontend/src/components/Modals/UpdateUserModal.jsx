import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Row, Button, Modal, Form } from "react-bootstrap";
import { updateUser, readUser } from "../../services/UsersGrid-services";

export default function UpdateUserModal({
   id,
   show,
   handleClose,
   handleUpdate,
}) {
   const [formData, setFormData] = useState({
      email: "",
      phone: "",
      birthDate: "",
   });

   useEffect(() => {
      if (show && id) {
         async () => {
            try {
               const user = await readUser(id);
               setFormData({
                  email: user.email,
                  phone: user.phone,
                  birthDate: user.birthDate,
               });
            } catch (error) {
               toast.error(`Error fetching user data: ${error}`);
            }
         };
      }
   }, [show, id]);

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

         handleClose();
         handleUpdate();
         toast.update(toastSubmit, {
            render: `${response.message}`,
            type: "success",
            isLoading: false,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
         });
      } catch (error) {
         toast.update(toastSubmit, {
            render: `${response.message + error}`,
            type: "error",
            isLoading: false,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
         });
      }
   }

   // Criação de um usuário
   async function editUser(id, newUserData) {
      //TODO: Validação

      const toastCreateUser = toast.loading("Updating user...");

      // Executa os comandos da service para requisição ao backend
      const response = await updateUser(id, newUserData);

      // Limpando os campos do formulário
      setFormData({
         email: "",
         phone: "",
         birthDate: "",
      });
      return response;
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
