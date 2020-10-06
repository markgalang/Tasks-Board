import { UPDATE_BOARD } from "../type";
import uuid from "uuid/v4";
const itemsFromBackend = [
  {
    id: uuid(),
    title: "one",
    description: "lorem ipsum dolor",
    assignedTo: [],
    due_date: "",
    isCompleted: false,
  },
  {
    id: uuid(),
    title: "two",
    description: "lorem ipsum dolor",
    assignedTo: [],
    due_date: "",
    isCompleted: false,
  },
];

const columnsFromBackend = {
  [uuid()]: {
    title: "Requested",
    tasks: itemsFromBackend,
  },
  [uuid()]: {
    title: "To do",
    tasks: [],
  },
  [uuid()]: {
    title: "In Progress",
    tasks: [],
  },
  [uuid()]: {
    title: "Done",
    tasks: [],
  },
};
export default (state = columnsFromBackend, action) => {
  switch (action.type) {
    case UPDATE_BOARD:
      return action.payload;
    default:
      return state;
  }
};
