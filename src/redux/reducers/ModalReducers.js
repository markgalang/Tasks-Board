import {
  OPEN_TASK_MODAL,
  OPEN_DELETE_MODAL,
  CLOSE_DELETE_MODAL,
  CLOSE_TASK_MODAL,
} from "../type";

const initialState = {
  taskModal: false,
  deleteModal: false,
  modalContent: "",
};
export default (state = initialState, action) => {
  let newState = {};

  switch (action.type) {
    case OPEN_TASK_MODAL:
      newState = {
        ...state,
        taskModal: true,
        modalContent: action.payload,
      };

      return newState;

    case OPEN_DELETE_MODAL:
      newState = {
        ...state,
        deleteModal: true,
        modalContent: action.payload,
      };

      return newState;
    case CLOSE_TASK_MODAL:
      newState = {
        ...state,
        taskModal: false,
        modalContent: "",
      };

      return newState;
    case CLOSE_DELETE_MODAL:
      newState = {
        ...state,
        deleteModal: false,
        modalContent: "",
      };

      return newState;
    default:
      return state;
  }
};
