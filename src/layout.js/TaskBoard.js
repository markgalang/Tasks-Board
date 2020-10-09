import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { onDragEnd, addNewColumn } from "../redux/actions/BoardActions";

// component
import TaskColumn from "../components/TaskColumn";
import TaskModal from "../components/TaskModal";
import DeleteModal from "../components/DeleteModal";

// MUI
import Input from "@material-ui/core/Input";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

// icons
import { Plus } from "react-feather";

const TaskBoard = (props) => {
  const { TaskColumns } = props;
  const { onDragEnd, addNewColumn } = props;
  const [newCardTitle, setNewCardTitle] = useState("");
  const [isNewCardClicked, setNewCardClicked] = useState(false);

  // useEffect(
  //   (prevProps) => {
  //     console.log(prevProps, props);
  //   },
  //   [props]
  // );
  const handleNewCard = (e, newCardTitle) => {
    e.preventDefault();

    if (newCardTitle !== "") {
      addNewColumn(newCardTitle);
      setNewCardTitle("");
    }
  };

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

                <ClickAwayListener onClickAway={() => setNewCardClicked(false)}>
                  <div className=" task-column task-column__new-card">
                    <>
                      <form onSubmit={(e) => handleNewCard(e, newCardTitle)}>
                        {isNewCardClicked ? (
                          <>
                            <Input
                              id="filled-basic"
                              label="Add New Card"
                              placeholder="Enter Card Title"
                              value={newCardTitle}
                              onChange={(e) => setNewCardTitle(e.target.value)}
                              onClick={(e) => e.stopPropagation()}
                              autoFocus
                            />
                            <button type="submit " className="add-button">
                              <Plus />
                            </button>
                          </>
                        ) : (
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              setNewCardClicked(true);
                            }}
                            className="task-column__new-card"
                          >
                            <button className="add-button">
                              <Plus />
                            </button>
                            Create New Card
                          </span>
                        )}
                      </form>
                    </>
                  </div>
                </ClickAwayListener>
              </div>
            );
          }}
        </Droppable>
      </DragDropContext>

      {/* ----- modals ----- */}
      <TaskModal />
      <DeleteModal />
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    TaskColumns: state.board,
  };
};

const mapActionToProps = {
  onDragEnd,
  addNewColumn,
};
export default connect(mapStateToProps, mapActionToProps)(TaskBoard);
