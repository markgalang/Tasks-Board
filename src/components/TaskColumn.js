import React, { useState, useEffect } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { updateColumnTitle } from "../redux/actions/BoardActions";
import { openDeleteModal } from "../redux/actions/ModalActions";

// components
import TaskCard from "./TaskCard";
import NewTaskInput from "./NewTaskInput";

// MUI
import Input from "@material-ui/core/Input";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

// icons
import { MoreHorizontal } from "react-feather";

const TaskColumn = (props) => {
  const [isTitleEdit, setIsTitleEdit] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { id, columnData, index } = props;
  const { title, tasks } = columnData;
  const [columnTitle, setColumnTitle] = useState(title);

  useEffect(() => {
    setColumnTitle(title);
    // eslint-disable-next-line
  }, [props]);

  const handleSubmit = () => {
    setIsTitleEdit(false);
    props.updateColumnTitle(id, columnTitle);
  };

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
            {/* <h2 {...provided.dragHandleProps} className="task-column__header">
              {title}
            </h2> */}

            {isTitleEdit ? (
              <ClickAwayListener
                onClickAway={() => {
                  handleSubmit();
                }}
              >
                <form {...provided.dragHandleProps} onSubmit={handleSubmit}>
                  <Input
                    id="filled-basic"
                    label="Add New Card"
                    placeholder="Enter Card Title"
                    value={columnTitle}
                    onChange={(e) => setColumnTitle(e.target.value)}
                    autoFocus
                  />
                </form>
              </ClickAwayListener>
            ) : (
              <h2 {...provided.dragHandleProps} className="task-column__header">
                {title}

                <MoreHorizontal
                  onClick={(e) => {
                    setAnchorEl(e.currentTarget);
                  }}
                />

                <Menu
                  key={title}
                  id={index}
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={(e) => {
                    e.stopPropagation();
                    setAnchorEl(null);
                  }}
                  elevation={0}
                  getContentAnchorEl={null}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <MenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsTitleEdit(true);
                      setAnchorEl(null);
                    }}
                  >
                    Edit
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      setAnchorEl(null);
                      props.openDeleteModal({ id, ...columnData });
                    }}
                  >
                    Remove
                  </MenuItem>
                </Menu>
              </h2>
            )}

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

const mapStateToProps = (state) => {
  return { ...state };
};

const mapActionToProps = {
  updateColumnTitle,
  openDeleteModal,
};

export default connect(mapStateToProps, mapActionToProps)(TaskColumn);
// export default TaskColumn;
