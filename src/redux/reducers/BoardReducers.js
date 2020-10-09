import {
  UPDATE_BOARD,
  ADD_COLUMN,
  ADD_TASK,
  TOGGLE_STATUS,
  ADD_NEW_COMMENT,
  UPDATE_COLUMN_TITLE,
  DELETE_COLUMN,
} from "../type";
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
        comments: [
          {
            author: {
              firstName: "Veronica",
              lastName: "Sweet",
              userImage:
                "https://www.kindpng.com/picc/m/163-1636340_user-avatar-icon-avatar-transparent-user-icon-png.png",
            },
            comment: "Perfect!",
            postedOn: Date.now(),
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
  const stateCopy = { ...state };
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

    case ADD_NEW_COMMENT:
      const sourceColumn1 = stateCopy[action.payload.columnId];
      let sourceTasks1 = sourceColumn1.tasks;
      const newTasksArray1 = sourceTasks1.map((task) => {
        if (task.id === action.payload.taskId) {
          task.comments.push(action.payload.newComment);
        }

        return task;
      });
      sourceColumn1.tasks = newTasksArray1;
      stateCopy[action.payload.columnId] = sourceColumn1;

      return stateCopy;

    case UPDATE_COLUMN_TITLE:
      const sourceColumn2 = stateCopy[action.payload.columnId];
      sourceColumn2.title = action.payload.newTitle;
      stateCopy[action.payload.columnId] = sourceColumn2;

      return state;

    case DELETE_COLUMN:
      const filteredArrayBoard = Object.entries(stateCopy).filter((column) => {
        return column[0] !== action.payload;
      });

      const filteredObjectBoard = Object.fromEntries(filteredArrayBoard);

      return filteredObjectBoard;
    default:
      return state;
  }
};
