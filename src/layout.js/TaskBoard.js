import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { onDragEnd } from "../redux/actions/BoardActions";

// component
import TaskColumn from "../components/TaskColumn";

const TaskBoard = (props) => {
  const { TaskColumns } = props;
  const { onDragEnd } = props;

  return (
    <div className="task-manager">
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, TaskColumns, null)}
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
                {Object.entries(TaskColumns).map(
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

const mapActionToProps = {
  onDragEnd,
};
export default connect(mapStateToProps, mapActionToProps)(TaskBoard);
