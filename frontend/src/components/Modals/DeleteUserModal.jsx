import { useState } from "react";
import { toast } from "react-toastify";
import { Row, Button, Modal, Form } from "react-bootstrap";
import { deleteUser } from "../../services/UsersGrid-services";

export default function DeleteUserModal(id, {show, handleClose}) {

   async function excludeUser() {
      const toastDeleteUser = toast.loading("Deleting user...");

      try {
         const response = await deleteUser(id);
         
         clearForm();
         return toast.success(`Success! + ${response}`, {
            id: toastDeleteUser,
         });
      } catch (error) {
         return toast.error("An error has occured: " + error, {
            id: toastDeleteUser,
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
         <Modal.Header closeButton>
            <Modal.Title>Delete User</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            Are you sure you want to delete this user? This action cannot be
            undone, and all associated data will be permanently removed.
         </Modal.Body>
         <Modal.Footer>
            <Button
               variant="secondary"
               onClick={() => {
                  handleClose();
               }}
            >
               Cancel
            </Button>
            <Button variant="Danger" onClick={excludeUser}>
               Delete
            </Button>
         </Modal.Footer>
      </Modal>
   );
}