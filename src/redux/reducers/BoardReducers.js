import { UPDATE_BOARD, ADD_COLUMN, ADD_TASK } from "../type";
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
    title: "To do",
    tasks: itemsFromBackend,
  },
  [uuid()]: {
    title: "In Progress",
    tasks: [],
  },
};
export default (state = columnsFromBackend, action) => {
  switch (action.type) {
    case UPDATE_BOARD:
      return action.payload;
    case ADD_COLUMN:
      const newColumnCard = {
        [uuid()]: {
          title: action.payload.title,
          tasks: [],
        },
      };
      return { ...state, ...newColumnCard };

    case ADD_TASK:
      const { columnId, newTaskInfo } = action.payload;

      let columnCopies = { ...state };
      let updatedColumn = columnCopies[columnId];
      updatedColumn.tasks.push(newTaskInfo);
      columnCopies[columnId] = updatedColumn;

      return columnCopies;

    default:
      return state;
  }
};
