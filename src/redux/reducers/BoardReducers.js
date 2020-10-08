import { UPDATE_BOARD, ADD_COLUMN, ADD_TASK, TOGGLE_STATUS } from "../type";
import uuid from "uuid/v4";

const columnsFromBackend = {
  [uuid()]: {
    title: "To do",
    tasks: [
      {
        id: uuid(),
        title: "ONE",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        assignedTo: [
          {
            firstName: "Mark",
            lastName: "Galang",
            userImage:
              "https://www.dovercourt.org/wp-content/uploads/2019/11/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.jpg",
          },
          {
            firstName: "Veronica",
            lastName: "Sweet",
            userImage:
              "https://www.kindpng.com/picc/m/163-1636340_user-avatar-icon-avatar-transparent-user-icon-png.png",
          },
        ],
        due_date: Date.now(),
        isCompleted: false,
      },
    ],
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
      let { newTaskInfo } = action.payload;

      let columnCopies = { ...state };
      let updatedColumn = columnCopies[action.payload.columnId];
      updatedColumn.tasks.push(newTaskInfo);
      columnCopies[action.payload.columnId] = updatedColumn;

      return columnCopies;

    case TOGGLE_STATUS:
      let { taskId, columnId } = action.payload;

      const stateCopy = { ...state };
      const sourceColumn = stateCopy[columnId];
      let sourceTasks = sourceColumn.tasks;
      const newTasksArray = sourceTasks.map((task) => {
        if (task.id === taskId) {
          const newStatus = !task.isCompleted;
          return { ...task, isCompleted: newStatus };
        }

        return task;
      });
      sourceColumn.tasks = newTasksArray;
      stateCopy[columnId] = sourceColumn;

      return stateCopy;
    default:
      return state;
  }
};
