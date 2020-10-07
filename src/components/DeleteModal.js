import React from "react";
import Modal from "react-bootstrap/Modal";

const DeleteConfirmationModal = (props) => {
  // const { modalContent, verb, handleSubmit, ...rest } = props;
  // const { _id, name, title, firstName, lastName } = modalContent;

  // const handleDelete = (id) => {
  //   handleSubmit(id);
  // };

  return (
    <Modal
      show={true}
      // {...rest}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="delete-modal-dialog"
      backdropClassName="delete-modal-dialog-backdrop"
    >
      <div className="delete-modal">
        <h1>DELETE</h1>
        {/* <div className="delete-modal__content">
          <p>
            Are you sure you want to {verb}{" "}
            <span>
              <strong>{`${
                title || name || firstName + " " + lastName
              }`}</strong>
            </span>
            ?
          </p>
        </div>
        <div className="delete-modal__buttons">
          <div
            className="delete-modal__buttons--remove"
            onClick={() => alert(_id)}
          >
            <p>{verb}</p>
          </div>
          <div
            className="delete-modal__buttons--cancel"
            onClick={() => alert()}
          >
            <p>CANCEL</p>
          </div>
        </div> */}
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
