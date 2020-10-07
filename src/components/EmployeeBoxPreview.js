import React from "react";

const EmployeeBoxPreview = (props) => {
  const { firstName, lastName, userImage } = props.userInfo;
  return (
    <div className="employee-preview">
      <img
        src={userImage}
        alt={`${firstName} ${lastName}`}
        className="employee-preview__image"
      />

      <p className="employee-preview__name">
        {firstName} {lastName}
      </p>
    </div>
  );
};

export default EmployeeBoxPreview;
