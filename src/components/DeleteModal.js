import React from "react";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
import { closeDeleteModal } from "../redux/actions/ModalActions";
import { deleteColumn, deleteTask } from "../redux/actions/BoardActions";

const DeleteModal = (props) => {
  const { modal, closeDeleteModal, deleteColumn, deleteTask } = props;
  const { id, title, columnId } = modal.modalContent;

  const handleDelete = (id) => {
    if (modal.taskModal && modal.deleteModal) {
      deleteTask(columnId, id);
    } else if (modal.deleteModal) {
      deleteColumn(id);
    }

    closeDeleteModal();
  };

  return (
    <Modal
      show={modal.deleteModal}
      onHide={() => closeDeleteModal()}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="delete-modal-dialog"
      backdropClassName="delete-modal-dialog-backdrop"
    >
      <div className="delete-modal">
        <div className="delete-modal__content">
          <p>
            Are you sure you want to delete{" "}
            <span>
              <strong>{title}</strong>
            </span>
            ?
          </p>
        </div>
        <div className="delete-modal__buttons">
          <div
            className="delete-modal__buttons--remove"
            onClick={() => handleDelete(id)}
          >
            <p>DELETE</p>
          </div>
          <div
            className="delete-modal__buttons--cancel"
            onClick={() => closeDeleteModal()}
          >
            <p>CANCEL</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    modal: state.modals,
  };
};

const mapActionToProps = {
  closeDeleteModal,
  deleteColumn,
  deleteTask,
};

export default connect(mapStateToProps, mapActionToProps)(DeleteModal);
