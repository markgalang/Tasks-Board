import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { connect } from "react-redux";

// component
import TaskColumn from "../components/TaskColumn";

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination, type } = result;
  if (type === "column") {
    let newColumnOrders = Object.entries(columns);
    const [draggedColumn] = newColumnOrders.splice(source.index, 1);
    newColumnOrders.splice(destination.index, 0, draggedColumn);
    setColumns(Object.fromEntries(newColumnOrders));
  } else {
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.tasks];
      const destItems = [...destColumn.tasks];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          tasks: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          tasks: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.tasks];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          tasks: copiedItems,
        },
      });
    }
  }
};

const TaskBoard = (props) => {
  const { TaskColumns } = props;
  const [columns, setColumns] = useState(TaskColumns);

  return (
    <div className="task-manager">
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => {
            return (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{ display: "flex" }}
              >
                {Object.entries(columns).map(
                  ([columnId, columnData], index) => {
                    return (
                      <TaskColumn
                        id={columnId}
                        columnData={columnData}
                        key={index}
                        index={index}
                      />
                    );
                  }
                )}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    TaskColumns: state.board,
  };
};
export default connect(mapStateToProps)(TaskBoard);
