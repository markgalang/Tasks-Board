import uuid from "uuid/v4";

export default (state, action) => {
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
  return columnsFromBackend;
};
