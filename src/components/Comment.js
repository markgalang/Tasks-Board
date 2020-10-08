import React from "react";
import moment from "moment";

const Comment = (props) => {
  const { author, comment, postedOn } = props;
  const { firstName, lastName, userImage } = author || {};
  return (
    <div className="comment">
      <div className="comment__author">
        <img
          src={userImage}
          alt={`${firstName} ${lastName}`}
          className="comment__author--image"
        />
        <div className="comment__author--details">
          <p className="comment__author--name">{`${firstName} ${lastName}`}</p>
          <small className="comment__author--postedOn">{`${moment(
            postedOn
          ).format("MMM DD, YYYY | h:mm a")}`}</small>
        </div>
      </div>
      <div className="comment__content">{comment}</div>
    </div>
  );
};

export default Comment;
