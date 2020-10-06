import React from "react";
import { Draggable } from "react-beautiful-dnd";
import moment from "moment";
// icons
import { Clock } from "react-feather";

const TaskCard = (props) => {
  const { task, index } = props;
  const { title, assignedTo, due_date, isCompleted } = task;
  const currentDate = moment(Date.now()).format("YYYY-MM-DD");
  const isOverdue = moment(currentDate).isAfter(due_date);
  const taskMembersLength = assignedTo.length;
  const getTaskStatus = () => {
    if (isCompleted) {
      return (
        <span className="task-card__description--completed">Completed</span>
      );
    } else if (due_date) {
      if (isOverdue) {
        return <span className="task-card__description--overdue">Overdue</span>;
      } else {
        return (
          <span>
            <Clock className="task-card__description--icon" />{" "}
            {moment(due_date).format("MMM DD")}
          </span>
        );
      }
    } else {
      return (
        <span>
          <em>No Due Date</em>
        </span>
      );
    }
  };

  const userImages = () => {
    if (taskMembersLength <= 3) {
      return assignedTo.map(({ userImage, firstName, lastName }, index) => (
        <img
          key={index}
          src={userImage}
          alt={`${firstName} ${lastName}`}
          className="task-card__description--profile-pictures--image"
        />
      ));
    } else {
      const previewProfilePictures = assignedTo.slice(0, 3);
      return previewProfilePictures.map(
        ({ userImage, firstName, lastName }, index) => (
          <img
            key={index}
            src={userImage}
            alt={`${firstName} ${lastName}`}
            className="task-card__description--profile-pictures--image"
          />
        )
      );
    }
  };

  return (
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            onClick={() => alert("open modal")}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              userSelect: "none",
              backgroundColor: snapshot.isDragging && "#eeeeee",
              ...provided.draggableProps.style,
            }}
            className="task-card"
          >
            <div className="task-card__title">{title}</div>
            <div className="task-card__description">
              <div className="task-card__description--status">
                {getTaskStatus()}
              </div>
              <div className="task-card__description--profile-pictures">
                {userImages()}
                {/* {taskMembersLength > 3 && `+${taskMembersLength - 3}`} */}
              </div>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};

export default TaskCard;
