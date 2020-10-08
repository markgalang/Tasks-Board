import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

// components
import TaskCard from "./TaskCard";
import NewTaskInput from "./NewTaskInput";

const TaskColumn = (props) => {
  const { id, columnData, index } = props;
  const { title, tasks } = columnData;
  return (
    <Draggable draggableId={String(index)} index={index}>
      {(provided) => {
        return (
          <div
            {...provided.draggableProps}
            ref={provided.innerRef}
            key={id}
            className="task-column"
          >
            <h2 {...provided.dragHandleProps} className="task-column__header">
              {title}
            </h2>

            <Droppable droppableId={id} type="task">
              {(provided, snapshot) => {
                return (
                  <>
                    <div
                      className="task-column__droppable-div"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        backgroundColor: snapshot.isDraggingOver
                          ? "lightblue"
                          : "lightgrey",
                      }}
                    >
                      {Object.entries(tasks).map(([columnId, task], index) => {
                        return (
                          <TaskCard
                            columnId={id}
                            task={task}
                            index={index}
                            key={task.id}
                          />
                        );
                      })}
                      {provided.placeholder}
                    </div>
                    <NewTaskInput columnId={id} />
                  </>
                );
              }}
            </Droppable>
          </div>
        );
      }}
    </Draggable>
  );
};

export default TaskColumn;
