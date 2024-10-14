import { toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";
import { deleteUser } from "../../services/UsersGrid-services";

export default function DeleteUserModal({id, show, handleClose, handleUpdate}) {
   async function excludeUser() {
      const toastDeleteUser = toast.loading("Deleting user...");

      try {
         const response = await deleteUser(id);

         handleClose();
         handleUpdate();
         toast.update(toastDeleteUser, {
            render: `${response.message}`,
            type: "success",
            isLoading: false,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true
         });
      } catch (error) {
         toast.update(toastDeleteUser, {
            render: `An error has occurred: ${error}`,
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
            <Modal.Title>Delete User</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            Are you sure you want to delete this user? This action cannot be
            undone, and all associated data will be permanently removed.
         </Modal.Body>
         <Modal.Footer>
            <Button
               variant="primary"
               onClick={() => {
                  handleClose();
               }}
            >
               Cancel
            </Button>
            <Button variant="danger" onClick={excludeUser}>
               Delete
            </Button>
         </Modal.Footer>
      </Modal>
   );
}
