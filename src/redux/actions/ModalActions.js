import { OPEN_DELETE_MODAL, CLOSE_DELETE_MODAL } from "../type";

export const openDeleteModal = (modalContent) => (dispatch) => {
  dispatch({ type: OPEN_DELETE_MODAL, payload: modalContent });
};

export const closeDeleteModal = () => (dispatch) => {
  dispatch({ type: CLOSE_DELETE_MODAL });
};
