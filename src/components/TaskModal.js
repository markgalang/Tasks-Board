import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { addNewComment } from "../redux/actions/BoardActions";
import { openDeleteModal } from "../redux/actions/ModalActions";

// import FormHelperText from "@material-ui/core/FormHelperText";

// Components
import EmployeePreview from "./EmployeeBoxPreview";
import Comment from "./Comment";

// bootstrap
import Modal from "react-bootstrap/Modal";

// MUI
import InputBase from "@material-ui/core/InputBase";
// import TextField from "@material-ui/core/TextField";
// import Autocomplete from "@material-ui/lab/Autocomplete";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

// icons
import {
  AlignLeft,
  X,
  Clipboard,
  Calendar,
  MoreHorizontal,
  // Clock,
} from "react-feather";
import { CLOSE_TASK_MODAL, TOGGLE_STATUS } from "../redux/type";

// const TaskForm = (props) => {
//   // const { modalContent, setModalContent } = useContext(GlobalContext);
//   // const { updateDashboardDetails } = useContext(DashboardContext);
//   // const [taskDetails, setTaskDetails] = useState({});
//   // const {
//   //   description,
//   //   due_date,
//   //   assignedTo = [],
//   //   title,
//   //   due_date_time,
//   // } = taskDetails;
//   // let taskId = modalContent._id;
//   // const { projectMembers } = props;

//   // const [errors, setErrors] = useState({ somethingErr: false });

//   // useEffect(() => {
//   //   const {
//   //     description,
//   //     due_date,
//   //     assignedTo,
//   //     title,
//   //     due_date_time,
//   //   } = modalContent;
//   //   setTaskDetails({ description, due_date, assignedTo, title, due_date_time });
//   // }, [modalContent]);

//   // const handleUpdate = (e) => {
//   //   e.preventDefault();

//   //   if (due_date !== undefined && due_date_time === undefined) {
//   //     return setErrors({
//   //       errorMsg: `Due Date Time must not be empty if there is a Due Date`,
//   //     });
//   //   }

//   //   if (due_date === undefined && due_date_time !== undefined) {
//   //     return setErrors({
//   //       errorMsg: `Due Date can must be empty if there is a Due Date Time`,
//   //     });
//   //   }

//   //   return axios
//   //     .put(`/tasks/${taskId}`, taskDetails)
//   //     .then((response) => {
//   //       props.setIsEditClicked(false);
//   //       setModalContent(response.data.task);
//   //       updateDashboardDetails();
//   //     })
//   //     .catch((err) => console.log(err.response.data));
//   // };

//   // const handleChange = (e) => {
//   //   const { name, value } = e.target;
//   //   setTaskDetails({ ...taskDetails, [name]: value });
//   // };

//   // const handleAssignedTo = (newValue) => {
//   //   setTaskDetails({ ...taskDetails, assignedTo: newValue });
//   // };

//   return (
//     <Fragment>
//       <h1>TASK MODAL!</h1>
//       {/* <div className="task-modal__header">
//         <div className="task-modal">
//           <X className="task-modal__button--close" onClick={props.handleHide} />
//           <form onKeyDown={(e) => e.keyCode === 13 && handleUpdate(e)}>
//             <h3 className="task-modal__title">
//               <InputBase
//                 className="task-modal__text-area "
//                 placeholder="Add Task Title here"
//                 name="title"
//                 value={title ? title : ""}
//                 onChange={handleChange}
//               />

//               <button
//                 className="task-modal__button--cancel"
//                 onClick={() => props.setIsEditClicked(false)}
//               >
//                 Cancel
//               </button>
//             </h3>

//             <div className="task-modal__assignedTo u-margin-medium-y">
//               <p className="task-modal__heading">
//                 <Clipboard className="task-modal__heading--icon" />
//                 Assigned To
//               </p>

//               <div className="task-modal__assignedTo--container">
//                 <Autocomplete
//                   multiple
//                   fullWidth
//                   id="tags-standard"
//                   options={projectMembers}
//                   getOptionLabel={({ firstName, lastName }) => {
//                     return `${firstName} ${lastName}`;
//                   }}
//                   renderInput={(params) => (
//                     <TextField
//                       {...params}
//                       placeholder="Assign to"
//                       className="task-modal__text-area"
//                     />
//                   )}
//                   onChange={(e, newValue) => handleAssignedTo(newValue)}
//                   getOptionSelected={(projectMembers, assignedTo) =>
//                     projectMembers.firstName === assignedTo.firstName
//                   }
//                   value={assignedTo}
//                 />
//               </div>
//             </div>
//             <div className="task-modal__due-date u-margin-medium-y">
//               <p className="task-modal__heading">
//                 <Calendar className="task-modal__heading--icon" />
//                 Due Date
//               </p>
//               <input
//                 id="date"
//                 type="date"
//                 className="task-modal__text-area"
//                 name="due_date"
//                 value={due_date || ""}
//                 onChange={handleChange}
//                 min={moment().format("YYYY-MM-DD")}
//               />
//             </div>
//             <div className="task-modal__due-date u-margin-medium-y">
//               <p className="task-modal__heading">
//                 <Clock className="task-modal__heading--icon" />
//                 Due Date Time
//               </p>
//               <input
//                 id="time"
//                 type="time"
//                 className="task-modal__text-area"
//                 name="due_date_time"
//                 value={due_date_time || ""}
//                 onChange={handleChange}
//                 min={moment().format("HH:mm")}
//                 required
//               />
//               {errors && (
//                 <FormHelperText error>{errors.errorMsg}</FormHelperText>
//               )}
//             </div>
//           </form>
//           <div className="task-modal__description u-margin-medium-y">
//             <p className="task-modal__heading">
//               <AlignLeft className="task-modal__heading--icon" />
//               Description
//             </p>

//             <InputBase
//               className="task-modal__text-area"
//               multiline
//               fullWidth
//               rows="5"
//               placeholder="Add Description here"
//               name="description"
//               value={description}
//               onChange={handleChange}
//             />
//           </div>
//         </div>
//       </div>
//       <div className="task-modal__footer">
//         <div onClick={handleUpdate} className="task-modal__footer--button">
//           Update Details
//         </div>
//       </div> */}
//     </Fragment>
//   );
// };

const TaskDetails = (props) => {
  const [newComment, setNewComment] = useState("");
  const [taskInfo, setTaskInfo] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const { authenticatedUser } = props;
  const {
    columnId,
    id,
    isCompleted,
    comments,
    description,
    due_date,
    assignedTo,
    title,
  } = taskInfo || {
    columnId: "",
    id: "",
    isCompleted: false,
    comments: [],
    description: "",
    due_date: "",
    assignedTo: [],
    title: "",
  };

  useEffect(() => {
    setTaskInfo(props.modalContent);
  }, [props]);

  let taskId = id;

  const handleStatusUpdate = (e) => {
    e.preventDefault();
    props.dispatch({
      type: TOGGLE_STATUS,
      payload: { taskId, columnId },
    });
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const newCommentDetails = {
      author: authenticatedUser,
      postedOn: Date.now(),
      comment: newComment,
    };
    props.dispatch(addNewComment(taskId, columnId, newCommentDetails));
    setNewComment("");
  };

  let assignedUsers =
    assignedTo && assignedTo.length > 0 ? (
      assignedTo.map((user, index) => (
        <EmployeePreview key={index} userInfo={user} />
      ))
    ) : (
      <span>
        <em>No Assigned User</em>
      </span>
    );

  let taskComments =
    comments && comments.length > 0 ? (
      comments.map((comment, index) => (
        <Comment
          key={index}
          author={comment.author}
          comment={comment.comment}
          postedOn={comment.createdAt}
        />
      ))
    ) : (
      <span>
        <em>No comments added</em>
      </span>
    );

  return (
    <Modal.Body>
      <div className="task-modal">
        <X className="task-modal__button--close" onClick={props.handleHide} />
        <h3 className="task-modal__title">
          {title}

          <MoreHorizontal
            onClick={(e) => {
              setAnchorEl(e.currentTarget);
            }}
          />

          <Menu
            key={id}
            id={id}
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
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <MenuItem
              onClick={(e) => {
                e.stopPropagation();
                setAnchorEl(null);
                // props.setIsEditClicked(true);
                // handleMenuClose();
              }}
            >
              Edit
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                e.stopPropagation();
                setAnchorEl(null);
                props.dispatch(openDeleteModal(taskInfo));
              }}
            >
              Remove
            </MenuItem>
          </Menu>
        </h3>

        <div className="task-modal__status">
          {isCompleted ? (
            <button
              className="task-modal__status--button task-modal__status--completed"
              onClick={handleStatusUpdate}
            >
              Completed
            </button>
          ) : (
            <button
              className="task-modal__status--button task-modal__status--incomplete"
              onClick={handleStatusUpdate}
            >
              Mark as complete
            </button>
          )}
        </div>

        <div className="task-modal__assignedTo u-margin-medium-y">
          <p className="task-modal__heading">
            <Clipboard className="task-modal__heading--icon" />
            Assigned To
          </p>

          <div className="task-modal__assignedTo--container">
            {assignedUsers}
          </div>
        </div>
        <div className="task-modal__due-date u-margin-medium-y">
          <p className="task-modal__heading">
            <Calendar className="task-modal__heading--icon" />
            Due Date
          </p>

          {due_date ? (
            <span className="task-modal__due-date--container">
              <span className="task-modal__due-date--date">
                {moment(due_date).format("MMM DD, YYYY")}
              </span>
              <small className="task-modal__due-date--text">Due Date</small>
            </span>
          ) : (
            <em>No Due Date</em>
          )}
        </div>
        <div className="task-modal__description u-margin-medium-y">
          <p className="task-modal__heading">
            <AlignLeft className="task-modal__heading--icon" />
            Description
          </p>

          {description ? (
            <p>{description}</p>
          ) : (
            <p>
              <em>No description</em>
            </p>
          )}
        </div>

        <div className="task-modal__task-activity u-margin-medium-y">
          <p className="task-modal__heading">Task Activity</p>
          <form
            onSubmit={(e) => handleCommentSubmit(e)}
            className="comment-form"
          >
            <img
              src={authenticatedUser.userImage}
              alt={`${authenticatedUser.firstName} ${authenticatedUser.lastName}`}
              className="comment__author--image"
            />

            <InputBase
              className="comment-form__text-area"
              multiline
              placeholder="Write a comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button type="submit" className="comment-form__button">
              Post
            </button>
          </form>
          {taskComments}
        </div>
      </div>
    </Modal.Body>
  );
};

const TaskModal = (props) => {
  const [
    ,
    // isEditClicked
    setIsEditClicked,
  ] = useState(false);

  const [taskInfo, setTaskInfo] = useState({});
  const {
    modals,
    authenticatedUser,
    dispatch,
    taskColumns,
    addNewComment,
  } = props;
  const { id, columnId } = modals.modalContent;

  useEffect(() => {
    const sourceColumn = taskColumns[columnId];
    let selectedTask = (sourceColumn &&
      sourceColumn.tasks.filter((task) => task.id === id)) || [{}];

    selectedTask[0].columnId = columnId;

    setTaskInfo(...selectedTask);
    // eslint-disable-next-line
  }, [props]);

  const handleHide = () => {
    dispatch({ type: CLOSE_TASK_MODAL });
  };

  return (
    <Modal
      show={modals.taskModal}
      onHide={handleHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable
    >
      {/* {!isEditClicked ? ( */}
      <TaskDetails
        modalContent={taskInfo}
        handleHide={handleHide}
        setIsEditClicked={setIsEditClicked}
        authenticatedUser={authenticatedUser}
        dispatch={dispatch}
        addNewComment={addNewComment}
      />
      {/* ) : (
        <TaskForm
          projectMembers={projectMembers}
          handleHide={handleHide}
          setIsEditClicked={setIsEditClicked}
        />
      )}
 */}
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    taskColumns: state.board,
    modals: state.modals,
    authenticatedUser: state.authenticatedUser,
  };
};

const mapActionToProps = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(mapStateToProps, mapActionToProps)(TaskModal);
