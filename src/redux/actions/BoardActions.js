import {
  UPDATE_BOARD,
  ADD_COLUMN,
  ADD_TASK,
  ADD_NEW_COMMENT,
  UPDATE_COLUMN_TITLE,
  DELETE_COLUMN,
  DELETE_TASK,
  UPDATE_TASK_DETAILS,
} from "../type";
import uuid from "uuid/v4";

export const onDragEnd = (result, columns, setColumns) => (dispatch) => {
  if (!result.destination) return;
  const { source, destination, type } = result;
  let newBoardStatus = {};
  if (type === "column") {
    let newColumnOrders = Object.entries(columns);
    const [draggedColumn] = newColumnOrders.splice(source.index, 1);
    newColumnOrders.splice(destination.index, 0, draggedColumn);
    newBoardStatus = Object.fromEntries(newColumnOrders);
  } else {
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.tasks];
      const destItems = [...destColumn.tasks];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      newBoardStatus = {
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          tasks: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          tasks: destItems,
        },
      };
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.tasks];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      newBoardStatus = {
        ...columns,
        [source.droppableId]: {
          ...column,
          tasks: copiedItems,
        },
      };
    }
  }

  dispatch({ type: UPDATE_BOARD, payload: newBoardStatus });
};

export const addNewColumn = (newColumnCard) => (dispatch) => {
  dispatch({ type: ADD_COLUMN, payload: { title: newColumnCard } });
};
export const addNewTask = (columnId, newTask) => (dispatch) => {
  if (newTask === "") return;

  const newTaskInfo = {
    id: uuid(),
    title: newTask,
    description: "",
    assignedTo: [],
    comments: [],
    due_date: "",
    isCompleted: false,
  };

  dispatch({ type: ADD_TASK, payload: { columnId, newTaskInfo } });
};

export const addNewComment = (taskId, columnId, newComment) => (dispatch) => {
  if (newComment === "") return;
  dispatch({
    type: ADD_NEW_COMMENT,
    payload: { taskId, columnId, newComment },
  });
};

export const updateColumnTitle = (columnId, newTitle) => (dispatch) => {
  if (newTitle === "") return;
  dispatch({ type: UPDATE_COLUMN_TITLE, payload: { columnId, newTitle } });
};

export const deleteColumn = (columnId) => (dispatch) => {
  dispatch({ type: DELETE_COLUMN, payload: columnId });
};

export const deleteTask = (columnId, taskId) => (dispatch) => {
  dispatch({ type: DELETE_TASK, payload: { columnId, taskId } });
};

export const updateTask = (columnId, taskId, newTaskInfo) => (dispatch) => {
  dispatch({
    type: UPDATE_TASK_DETAILS,
    payload: { columnId, taskId, newTaskInfo },
  });
};
