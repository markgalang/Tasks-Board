import React, { useState } from "react";
import { addNewTask } from "../redux/actions/BoardActions";
import { connect } from "react-redux";

// MUI
import Input from "@material-ui/core/Input";

// icons
import { Plus } from "react-feather";

const NewTaskInput = (props) => {
  const [newTask, setNewTask] = useState("");

  const columnId = props.columnId;

  const handleSubmit = (e, columnId) => {
    e.preventDefault();

    props.dispatch(addNewTask(columnId, newTask));
    setNewTask("");
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, columnId)} className="new-task">
      <button type="submit" className="add-button">
        <Plus />
      </button>
      <Input
        name="NewTask"
        placeholder="Add task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
    </form>
  );
};

export default connect(null)(NewTaskInput);
