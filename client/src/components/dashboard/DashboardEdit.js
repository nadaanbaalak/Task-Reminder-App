import React from "react";
import { Link } from "react-router-dom";

const DashboardEdit = () => {
  return (
    <div className="dash-buttons">
      <Link to="/edit-profile" className="btn btn-light">
        Edit Profile
      </Link>
    </div>
  );
};

export default DashboardEdit;
